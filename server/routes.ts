import type { Express, Response, NextFunction } from "express";
import type { Request as ExpressRequest } from "express";

// Extended Request type with user property
interface Request extends ExpressRequest {
  user?: {
    id: number;
    email: string;
    role: string;
  };
}
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { generateRecommendations, type RecommendationRequest } from "./utils/openai";
import { 
  insertContactSchema, 
  insertUserSchema,
  insertAiToolSchema,
  insertLeadSchema,
  insertAppointmentSchema,
  insertChatLogSchema,
  insertUserPreferencesSchema,
  insertUserActivitySchema,
  insertAiRecommendationSchema
} from "@shared/schema";
import { fromZodError } from "zod-validation-error";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ZodError } from "zod";

// JWT secret - should be in environment variable in production
const JWT_SECRET = process.env.JWT_SECRET || "bizai-boosters-secret-key";

// Helper to handle errors
const handleError = (error: unknown, res: Response) => {
  if (error instanceof Error) {
    // Handle Zod validation errors
    if (error.name === "ZodError") {
      const validationError = fromZodError(error as ZodError);
      return res.status(400).json({ 
        success: false, 
        message: validationError.message 
      });
    }

    // Handle other errors
    return res.status(500).json({ 
      success: false, 
      message: error.message || "An error occurred while processing your request" 
    });
  }
  
  return res.status(500).json({ 
    success: false, 
    message: "An unknown error occurred" 
  });
};

// Middleware to authenticate requests
const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, message: "Authentication required" });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ success: false, message: "Invalid or expired token" });
    }
    
    req.user = user as any;
    next();
  });
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.status(200).json({ status: "ok" });
  });

  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate request body
      const validatedData = insertContactSchema.parse({
        ...req.body,
        status: "new" // Set default status
      });
      
      // Save contact submission
      const contact = await storage.createContactSubmission(validatedData);
      
      res.status(201).json({ success: true, id: contact.id });
    } catch (error) {
      handleError(error, res);
    }
  });

  // User registration
  app.post("/api/auth/register", async (req, res) => {
    try {
      // Validate request body
      const userData = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(userData.email);
      if (existingUser) {
        return res.status(400).json({ 
          success: false,
          message: "User with this email already exists" 
        });
      }
      
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(userData.password, salt);
      
      // Create user with hashed password
      const user = await storage.createUser({
        ...userData,
        password: hashedPassword
      });
      
      // Generate JWT token
      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: '24h' }
      );
      
      // Return user data (excluding password) and token
      const { password, ...userWithoutPassword } = user;
      res.status(201).json({
        success: true,
        user: userWithoutPassword,
        token
      });
    } catch (error) {
      handleError(error, res);
    }
  });

  // User login
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      
      // Validate required fields
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "Email and password are required"
        });
      }
      
      // Check if user exists
      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password"
        });
      }
      
      // Check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password"
        });
      }
      
      // Generate JWT token
      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: '24h' }
      );
      
      // Return user data (excluding password) and token
      const { password: _, ...userWithoutPassword } = user;
      res.status(200).json({
        success: true,
        user: userWithoutPassword,
        token
      });
    } catch (error) {
      handleError(error, res);
    }
  });

  // Get user profile
  app.get("/api/user/profile", authenticateToken, async (req, res) => {
    try {
      const userId = req.user!.id;
      const user = await storage.getUser(userId);
      
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found"
        });
      }
      
      // Return user data excluding password
      const { password, ...userWithoutPassword } = user;
      res.status(200).json({
        success: true,
        user: userWithoutPassword
      });
    } catch (error) {
      handleError(error, res);
    }
  });

  // Update user profile
  app.patch("/api/user/profile", authenticateToken, async (req, res) => {
    try {
      const userId = req.user.id;
      const { password, ...updateData } = req.body;
      
      // Hash password if provided
      if (password) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        updateData.password = hashedPassword;
      }
      
      const updatedUser = await storage.updateUser(userId, updateData);
      
      if (!updatedUser) {
        return res.status(404).json({
          success: false,
          message: "User not found"
        });
      }
      
      // Return updated user data excluding password
      const { password: _, ...userWithoutPassword } = updatedUser;
      res.status(200).json({
        success: true,
        user: userWithoutPassword
      });
    } catch (error) {
      handleError(error, res);
    }
  });

  // AI Tools endpoints
  // Create a new AI tool
  app.post("/api/tools", authenticateToken, async (req, res) => {
    try {
      const userId = req.user.id;
      
      // Validate request body
      const toolData = insertAiToolSchema.parse({
        ...req.body,
        userId
      });
      
      const tool = await storage.createAiTool(toolData);
      
      res.status(201).json({
        success: true,
        tool
      });
    } catch (error) {
      handleError(error, res);
    }
  });

  // Get all AI tools for a user
  app.get("/api/tools", authenticateToken, async (req, res) => {
    try {
      const userId = req.user.id;
      const tools = await storage.getAiToolsByUser(userId);
      
      res.status(200).json({
        success: true,
        tools
      });
    } catch (error) {
      handleError(error, res);
    }
  });

  // Get a specific AI tool
  app.get("/api/tools/:id", authenticateToken, async (req, res) => {
    try {
      const toolId = parseInt(req.params.id);
      const userId = req.user.id;
      
      const tool = await storage.getAiTool(toolId);
      
      if (!tool) {
        return res.status(404).json({
          success: false,
          message: "AI tool not found"
        });
      }
      
      // Verify the tool belongs to the user
      if (tool.userId !== userId) {
        return res.status(403).json({
          success: false,
          message: "You don't have permission to access this tool"
        });
      }
      
      res.status(200).json({
        success: true,
        tool
      });
    } catch (error) {
      handleError(error, res);
    }
  });

  // Update an AI tool
  app.patch("/api/tools/:id", authenticateToken, async (req, res) => {
    try {
      const toolId = parseInt(req.params.id);
      const userId = req.user.id;
      
      // Check if the tool exists and belongs to the user
      const existingTool = await storage.getAiTool(toolId);
      
      if (!existingTool) {
        return res.status(404).json({
          success: false,
          message: "AI tool not found"
        });
      }
      
      if (existingTool.userId !== userId) {
        return res.status(403).json({
          success: false,
          message: "You don't have permission to update this tool"
        });
      }
      
      // Update the tool
      const updatedTool = await storage.updateAiTool(toolId, req.body);
      
      res.status(200).json({
        success: true,
        tool: updatedTool
      });
    } catch (error) {
      handleError(error, res);
    }
  });

  // Delete an AI tool
  app.delete("/api/tools/:id", authenticateToken, async (req, res) => {
    try {
      const toolId = parseInt(req.params.id);
      const userId = req.user.id;
      
      // Check if the tool exists and belongs to the user
      const existingTool = await storage.getAiTool(toolId);
      
      if (!existingTool) {
        return res.status(404).json({
          success: false,
          message: "AI tool not found"
        });
      }
      
      if (existingTool.userId !== userId) {
        return res.status(403).json({
          success: false,
          message: "You don't have permission to delete this tool"
        });
      }
      
      // Delete the tool
      const deleted = await storage.deleteAiTool(toolId);
      
      if (deleted) {
        res.status(200).json({
          success: true,
          message: "AI tool deleted successfully"
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Failed to delete the AI tool"
        });
      }
    } catch (error) {
      handleError(error, res);
    }
  });

  // Leads management endpoints
  // Create a new lead
  app.post("/api/leads", authenticateToken, async (req, res) => {
    try {
      const userId = req.user.id;
      
      // Validate request body
      const leadData = insertLeadSchema.parse({
        ...req.body,
        userId
      });
      
      const lead = await storage.createLead(leadData);
      
      res.status(201).json({
        success: true,
        lead
      });
    } catch (error) {
      handleError(error, res);
    }
  });

  // Get all leads for a user
  app.get("/api/leads", authenticateToken, async (req, res) => {
    try {
      const userId = req.user.id;
      const leads = await storage.getLeadsByUser(userId);
      
      res.status(200).json({
        success: true,
        leads
      });
    } catch (error) {
      handleError(error, res);
    }
  });

  // Appointments management endpoints
  // Create a new appointment
  app.post("/api/appointments", authenticateToken, async (req, res) => {
    try {
      const userId = req.user.id;
      
      // Validate request body
      const appointmentData = insertAppointmentSchema.parse({
        ...req.body,
        userId
      });
      
      const appointment = await storage.createAppointment(appointmentData);
      
      res.status(201).json({
        success: true,
        appointment
      });
    } catch (error) {
      handleError(error, res);
    }
  });

  // Get all appointments for a user
  app.get("/api/appointments", authenticateToken, async (req, res) => {
    try {
      const userId = req.user.id;
      const appointments = await storage.getAppointmentsByUser(userId);
      
      res.status(200).json({
        success: true,
        appointments
      });
    } catch (error) {
      handleError(error, res);
    }
  });

  // Chat logs endpoints
  // Create a new chat log
  app.post("/api/chatlogs", authenticateToken, async (req, res) => {
    try {
      const userId = req.user.id;
      
      // Validate request body
      const chatLogData = insertChatLogSchema.parse({
        ...req.body,
        userId
      });
      
      // Verify the tool belongs to the user
      const tool = await storage.getAiTool(chatLogData.toolId);
      
      if (!tool) {
        return res.status(404).json({
          success: false,
          message: "AI tool not found"
        });
      }
      
      if (tool.userId !== userId) {
        return res.status(403).json({
          success: false,
          message: "You don't have permission to log chats for this tool"
        });
      }
      
      const chatLog = await storage.createChatLog(chatLogData);
      
      res.status(201).json({
        success: true,
        chatLog
      });
    } catch (error) {
      handleError(error, res);
    }
  });

  // Get chat logs for a specific tool
  app.get("/api/tools/:id/chatlogs", authenticateToken, async (req, res) => {
    try {
      const toolId = parseInt(req.params.id);
      const userId = req.user.id;
      
      // Verify the tool belongs to the user
      const tool = await storage.getAiTool(toolId);
      
      if (!tool) {
        return res.status(404).json({
          success: false,
          message: "AI tool not found"
        });
      }
      
      if (tool.userId !== userId) {
        return res.status(403).json({
          success: false,
          message: "You don't have permission to access chat logs for this tool"
        });
      }
      
      const chatLogs = await storage.getChatLogsByTool(toolId);
      
      res.status(200).json({
        success: true,
        chatLogs
      });
    } catch (error) {
      handleError(error, res);
    }
  });

  // User Preferences endpoints
  // Get user preferences
  app.get("/api/user/preferences", authenticateToken, async (req, res) => {
    try {
      const userId = req.user!.id;
      const preferences = await storage.getUserPreferences(userId);
      
      res.status(200).json({
        success: true,
        preferences: preferences || null
      });
    } catch (error) {
      handleError(error, res);
    }
  });

  // Create or update user preferences
  app.post("/api/user/preferences", authenticateToken, async (req, res) => {
    try {
      const userId = req.user!.id;
      
      // Check if preferences already exist
      const existingPreferences = await storage.getUserPreferences(userId);
      
      if (existingPreferences) {
        // Update existing preferences
        const updatedPreferences = await storage.updateUserPreferences(
          userId,
          { ...req.body }
        );
        
        res.status(200).json({
          success: true,
          preferences: updatedPreferences
        });
      } else {
        // Create new preferences
        const preferencesData = insertUserPreferencesSchema.parse({
          userId,
          ...req.body
        });
        
        const preferences = await storage.createUserPreferences(preferencesData);
        
        res.status(201).json({
          success: true,
          preferences
        });
      }
    } catch (error) {
      handleError(error, res);
    }
  });

  // User activity tracking
  app.post("/api/user/activity", authenticateToken, async (req, res) => {
    try {
      const userId = req.user!.id;
      
      const activityData = insertUserActivitySchema.parse({
        userId,
        ...req.body,
        // Ensure createdAt is a valid date if provided, otherwise use current time
        createdAt: req.body.createdAt ? new Date(req.body.createdAt) : new Date()
      });
      
      const activity = await storage.createUserActivity(activityData);
      
      res.status(201).json({
        success: true,
        activity
      });
    } catch (error) {
      handleError(error, res);
    }
  });

  // AI Recommendations endpoints
  // Get recommendations for a user
  app.get("/api/recommendations", authenticateToken, async (req, res) => {
    try {
      const userId = req.user!.id;
      const recommendations = await storage.getRecommendationsByUser(userId);
      
      res.status(200).json({
        success: true,
        recommendations
      });
    } catch (error) {
      handleError(error, res);
    }
  });

  // Generate new AI recommendations
  app.post("/api/recommendations/generate", authenticateToken, async (req, res) => {
    try {
      const userId = req.user!.id;
      
      // Get user preferences
      const preferences = await storage.getUserPreferences(userId);
      
      // Get recent user activities (last 30 days)
      const recentActivities = await storage.getRecentUserActivities(userId, 30);
      
      // Get current tools used by the user
      const userTools = await storage.getAiToolsByUser(userId);
      
      // Prepare request for OpenAI
      const request: RecommendationRequest = {
        userId,
        userIndustry: preferences?.industry,
        businessSize: preferences?.businessSize,
        existingTools: userTools.map(tool => tool.toolType),
        interests: preferences?.interests as string[] || [],
        recentActions: recentActivities.map(activity => ({
          type: activity.activityType,
          entity: activity.entityType,
          timestamp: activity.createdAt
        }))
      };
      
      // Generate recommendations
      const aiRecommendations = await generateRecommendations(request);
      
      // Save recommendations to database
      const savedRecommendations = [];
      
      for (const rec of aiRecommendations) {
        const recommendationData = {
          userId,
          toolType: rec.toolType as any, // Cast to appropriate enum type
          toolName: rec.toolName,
          score: parseInt(rec.score.toString()),
          reason: rec.reason,
          metadata: { originalResponse: rec }
        };
        
        const savedRec = await storage.createRecommendation(recommendationData);
        savedRecommendations.push(savedRec);
      }
      
      // Clean up old recommendations, keeping only the 10 most recent
      await storage.deleteOldRecommendations(userId, 10);
      
      res.status(200).json({
        success: true,
        recommendations: savedRecommendations
      });
    } catch (error) {
      handleError(error, res);
    }
  });

  // Mark recommendation as clicked
  app.post("/api/recommendations/:id/click", authenticateToken, async (req, res) => {
    try {
      const recommendationId = parseInt(req.params.id);
      const userId = req.user!.id;
      
      // Update the recommendation
      const updatedRecommendation = await storage.updateRecommendation(
        recommendationId,
        { clicked: true }
      );
      
      if (!updatedRecommendation) {
        return res.status(404).json({
          success: false,
          message: "Recommendation not found"
        });
      }
      
      res.status(200).json({
        success: true,
        recommendation: updatedRecommendation
      });
    } catch (error) {
      handleError(error, res);
    }
  });

  // Mark recommendation as implemented
  app.post("/api/recommendations/:id/implement", authenticateToken, async (req, res) => {
    try {
      const recommendationId = parseInt(req.params.id);
      const userId = req.user!.id;
      
      // Update the recommendation
      const updatedRecommendation = await storage.updateRecommendation(
        recommendationId,
        { implemented: true }
      );
      
      if (!updatedRecommendation) {
        return res.status(404).json({
          success: false,
          message: "Recommendation not found"
        });
      }
      
      res.status(200).json({
        success: true,
        recommendation: updatedRecommendation
      });
    } catch (error) {
      handleError(error, res);
    }
  });

  // Create HTTP server
  const httpServer = createServer(app);
  return httpServer;
}
