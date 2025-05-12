import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate request body
      const validatedData = insertContactSchema.parse(req.body);
      
      // Save contact submission
      const contact = await storage.createContactSubmission(validatedData);
      
      res.status(201).json({ success: true, id: contact.id });
    } catch (error) {
      if (error instanceof Error) {
        // Handle Zod validation errors
        if (error.name === "ZodError") {
          const validationError = fromZodError(error);
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
      
      res.status(500).json({ 
        success: false, 
        message: "An unknown error occurred" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
