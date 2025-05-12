import { 
  users, type User, type InsertUser, 
  contactSubmissions, type Contact, type InsertContact,
  aiTools, type AiTool, type InsertAiTool,
  plans, type Plan, type InsertPlan,
  subscriptions, type Subscription, type InsertSubscription,
  chatLogs, type ChatLog, type InsertChatLog,
  leads, type Lead, type InsertLead,
  appointments, type Appointment, type InsertAppointment
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

// Interface for storage operations
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, user: Partial<InsertUser>): Promise<User | undefined>;
  
  // Contact form operations
  createContactSubmission(contact: InsertContact): Promise<Contact>;
  getContactSubmissions(): Promise<Contact[]>;
  getContactSubmission(id: number): Promise<Contact | undefined>;
  
  // AI Tool operations
  createAiTool(tool: InsertAiTool): Promise<AiTool>;
  getAiTool(id: number): Promise<AiTool | undefined>;
  getAiToolsByUser(userId: number): Promise<AiTool[]>;
  updateAiTool(id: number, tool: Partial<InsertAiTool>): Promise<AiTool | undefined>;
  deleteAiTool(id: number): Promise<boolean>;
  
  // Plan operations
  createPlan(plan: InsertPlan): Promise<Plan>;
  getPlans(): Promise<Plan[]>;
  getPlan(id: number): Promise<Plan | undefined>;
  
  // Subscription operations
  createSubscription(subscription: InsertSubscription): Promise<Subscription>;
  getSubscription(id: number): Promise<Subscription | undefined>;
  getSubscriptionsByUser(userId: number): Promise<Subscription[]>;
  updateSubscription(id: number, subscription: Partial<InsertSubscription>): Promise<Subscription | undefined>;
  
  // Chat log operations
  createChatLog(chatLog: InsertChatLog): Promise<ChatLog>;
  getChatLogsByUser(userId: number): Promise<ChatLog[]>;
  getChatLogsByTool(toolId: number): Promise<ChatLog[]>;
  
  // Lead operations
  createLead(lead: InsertLead): Promise<Lead>;
  getLeadsByUser(userId: number): Promise<Lead[]>;
  updateLead(id: number, lead: Partial<InsertLead>): Promise<Lead | undefined>;
  
  // Appointment operations
  createAppointment(appointment: InsertAppointment): Promise<Appointment>;
  getAppointmentsByUser(userId: number): Promise<Appointment[]>;
  updateAppointment(id: number, appointment: Partial<InsertAppointment>): Promise<Appointment | undefined>;
}

// Database storage implementation
export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async updateUser(id: number, userData: Partial<InsertUser>): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set(userData)
      .where(eq(users.id, id))
      .returning();
    return user;
  }

  // Contact form operations
  async createContactSubmission(insertContact: InsertContact): Promise<Contact> {
    const [contact] = await db
      .insert(contactSubmissions)
      .values(insertContact)
      .returning();
    return contact;
  }

  async getContactSubmissions(): Promise<Contact[]> {
    return await db
      .select()
      .from(contactSubmissions)
      .orderBy(desc(contactSubmissions.createdAt));
  }

  async getContactSubmission(id: number): Promise<Contact | undefined> {
    const [contact] = await db
      .select()
      .from(contactSubmissions)
      .where(eq(contactSubmissions.id, id));
    return contact;
  }

  // AI Tool operations
  async createAiTool(insertTool: InsertAiTool): Promise<AiTool> {
    const [tool] = await db
      .insert(aiTools)
      .values(insertTool)
      .returning();
    return tool;
  }

  async getAiTool(id: number): Promise<AiTool | undefined> {
    const [tool] = await db
      .select()
      .from(aiTools)
      .where(eq(aiTools.id, id));
    return tool;
  }

  async getAiToolsByUser(userId: number): Promise<AiTool[]> {
    return await db
      .select()
      .from(aiTools)
      .where(eq(aiTools.userId, userId))
      .orderBy(desc(aiTools.updatedAt));
  }

  async updateAiTool(id: number, toolData: Partial<InsertAiTool>): Promise<AiTool | undefined> {
    const [tool] = await db
      .update(aiTools)
      .set(toolData)
      .where(eq(aiTools.id, id))
      .returning();
    return tool;
  }

  async deleteAiTool(id: number): Promise<boolean> {
    const [deletedTool] = await db
      .delete(aiTools)
      .where(eq(aiTools.id, id))
      .returning();
    return !!deletedTool;
  }

  // Plan operations
  async createPlan(insertPlan: InsertPlan): Promise<Plan> {
    const [plan] = await db
      .insert(plans)
      .values(insertPlan)
      .returning();
    return plan;
  }

  async getPlans(): Promise<Plan[]> {
    return await db
      .select()
      .from(plans)
      .orderBy(plans.monthlyPrice);
  }

  async getPlan(id: number): Promise<Plan | undefined> {
    const [plan] = await db
      .select()
      .from(plans)
      .where(eq(plans.id, id));
    return plan;
  }

  // Subscription operations
  async createSubscription(insertSubscription: InsertSubscription): Promise<Subscription> {
    const [subscription] = await db
      .insert(subscriptions)
      .values(insertSubscription)
      .returning();
    return subscription;
  }

  async getSubscription(id: number): Promise<Subscription | undefined> {
    const [subscription] = await db
      .select()
      .from(subscriptions)
      .where(eq(subscriptions.id, id));
    return subscription;
  }

  async getSubscriptionsByUser(userId: number): Promise<Subscription[]> {
    return await db
      .select()
      .from(subscriptions)
      .where(eq(subscriptions.userId, userId))
      .orderBy(desc(subscriptions.createdAt));
  }

  async updateSubscription(id: number, subscriptionData: Partial<InsertSubscription>): Promise<Subscription | undefined> {
    const [subscription] = await db
      .update(subscriptions)
      .set(subscriptionData)
      .where(eq(subscriptions.id, id))
      .returning();
    return subscription;
  }

  // Chat log operations
  async createChatLog(insertChatLog: InsertChatLog): Promise<ChatLog> {
    const [chatLog] = await db
      .insert(chatLogs)
      .values(insertChatLog)
      .returning();
    return chatLog;
  }

  async getChatLogsByUser(userId: number): Promise<ChatLog[]> {
    return await db
      .select()
      .from(chatLogs)
      .where(eq(chatLogs.userId, userId))
      .orderBy(desc(chatLogs.createdAt));
  }

  async getChatLogsByTool(toolId: number): Promise<ChatLog[]> {
    return await db
      .select()
      .from(chatLogs)
      .where(eq(chatLogs.toolId, toolId))
      .orderBy(desc(chatLogs.createdAt));
  }

  // Lead operations
  async createLead(insertLead: InsertLead): Promise<Lead> {
    const [lead] = await db
      .insert(leads)
      .values(insertLead)
      .returning();
    return lead;
  }

  async getLeadsByUser(userId: number): Promise<Lead[]> {
    return await db
      .select()
      .from(leads)
      .where(eq(leads.userId, userId))
      .orderBy(desc(leads.createdAt));
  }

  async updateLead(id: number, leadData: Partial<InsertLead>): Promise<Lead | undefined> {
    const [lead] = await db
      .update(leads)
      .set(leadData)
      .where(eq(leads.id, id))
      .returning();
    return lead;
  }

  // Appointment operations
  async createAppointment(insertAppointment: InsertAppointment): Promise<Appointment> {
    const [appointment] = await db
      .insert(appointments)
      .values(insertAppointment)
      .returning();
    return appointment;
  }

  async getAppointmentsByUser(userId: number): Promise<Appointment[]> {
    return await db
      .select()
      .from(appointments)
      .where(eq(appointments.userId, userId))
      .orderBy(desc(appointments.appointmentDate));
  }

  async updateAppointment(id: number, appointmentData: Partial<InsertAppointment>): Promise<Appointment | undefined> {
    const [appointment] = await db
      .update(appointments)
      .set(appointmentData)
      .where(eq(appointments.id, id))
      .returning();
    return appointment;
  }
}

// Export an instance of the database storage
export const storage = new DatabaseStorage();
