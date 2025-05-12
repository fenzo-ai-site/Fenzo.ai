import { pgTable, text, serial, integer, boolean, timestamp, pgEnum, json, date, foreignKey, varchar, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";
import { z } from "zod";

// Users
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone"),
  password: text("password").notNull(),
  company: text("company"),
  role: text("role").default("user").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const usersRelations = relations(users, ({ many, one }) => ({
  aiTools: many(aiTools),
  subscriptions: many(subscriptions),
  chatLogs: many(chatLogs),
  leads: many(leads),
  appointments: many(appointments),
  preferences: one(userPreferences),
  activities: many(userActivities),
  recommendations: many(aiRecommendations),
}));

export const insertUserSchema = createInsertSchema(users).pick({
  name: true,
  email: true,
  phone: true,
  password: true,
  company: true,
  role: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Contact form submissions
export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  company: text("company"),
  message: text("message").notNull(),
  status: text("status").default("new").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertContactSchema = createInsertSchema(contactSubmissions).pick({
  name: true,
  email: true,
  phone: true,
  company: true,
  message: true,
  status: true,
});

export type InsertContact = z.infer<typeof insertContactSchema>;
export type Contact = typeof contactSubmissions.$inferSelect;

// AI Tools
export const toolTypeEnum = pgEnum("tool_type", [
  "whatsapp_chatbot",
  "customer_support",
  "social_media_writer",
  "custom_gpt",
  "mini_website",
  "local_language_chat",
  "email_generator",
  "lead_collector",
  "appointment_booking",
  "analytics_dashboard",
]);

export const aiTools = pgTable("ai_tools", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  description: text("description"),
  toolType: toolTypeEnum("tool_type").notNull(),
  configuration: json("configuration"),
  active: boolean("active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const aiToolsRelations = relations(aiTools, ({ one, many }) => ({
  user: one(users, {
    fields: [aiTools.userId],
    references: [users.id],
  }),
  chatLogs: many(chatLogs),
}));

export const insertAiToolSchema = createInsertSchema(aiTools).pick({
  userId: true,
  name: true,
  description: true,
  toolType: true,
  configuration: true,
  active: true,
});

export type InsertAiTool = z.infer<typeof insertAiToolSchema>;
export type AiTool = typeof aiTools.$inferSelect;

// Subscription Plans
export const plans = pgTable("plans", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  monthlyPrice: decimal("monthly_price", { precision: 10, scale: 2 }).notNull(),
  yearlyPrice: decimal("yearly_price", { precision: 10, scale: 2 }).notNull(),
  features: json("features").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const plansRelations = relations(plans, ({ many }) => ({
  subscriptions: many(subscriptions),
}));

export const insertPlanSchema = createInsertSchema(plans).pick({
  name: true,
  description: true,
  monthlyPrice: true,
  yearlyPrice: true,
  features: true,
});

export type InsertPlan = z.infer<typeof insertPlanSchema>;
export type Plan = typeof plans.$inferSelect;

// Subscriptions
export const subscriptions = pgTable("subscriptions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  planId: integer("plan_id").notNull().references(() => plans.id),
  startDate: date("start_date").notNull(),
  endDate: date("end_date").notNull(),
  isYearly: boolean("is_yearly").default(false).notNull(),
  status: text("status").default("active").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const subscriptionsRelations = relations(subscriptions, ({ one }) => ({
  user: one(users, {
    fields: [subscriptions.userId],
    references: [users.id],
  }),
  plan: one(plans, {
    fields: [subscriptions.planId],
    references: [plans.id],
  }),
}));

export const insertSubscriptionSchema = createInsertSchema(subscriptions).pick({
  userId: true,
  planId: true,
  startDate: true,
  endDate: true,
  isYearly: true,
  status: true,
});

export type InsertSubscription = z.infer<typeof insertSubscriptionSchema>;
export type Subscription = typeof subscriptions.$inferSelect;

// Chat Logs
export const chatLogs = pgTable("chat_logs", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  toolId: integer("tool_id").notNull().references(() => aiTools.id, { onDelete: "cascade" }),
  userMessage: text("user_message").notNull(),
  aiResponse: text("ai_response").notNull(),
  platform: text("platform").notNull(),
  metadata: json("metadata"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const chatLogsRelations = relations(chatLogs, ({ one }) => ({
  user: one(users, {
    fields: [chatLogs.userId],
    references: [users.id],
  }),
  tool: one(aiTools, {
    fields: [chatLogs.toolId],
    references: [aiTools.id],
  }),
}));

export const insertChatLogSchema = createInsertSchema(chatLogs).pick({
  userId: true,
  toolId: true,
  userMessage: true,
  aiResponse: true,
  platform: true,
  metadata: true,
});

export type InsertChatLog = z.infer<typeof insertChatLogSchema>;
export type ChatLog = typeof chatLogs.$inferSelect;

// Leads
export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  email: text("email"),
  phone: text("phone"),
  source: text("source").notNull(),
  status: text("status").default("new").notNull(),
  notes: text("notes"),
  metadata: json("metadata"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const leadsRelations = relations(leads, ({ one }) => ({
  user: one(users, {
    fields: [leads.userId],
    references: [users.id],
  }),
}));

export const insertLeadSchema = createInsertSchema(leads).pick({
  userId: true,
  name: true,
  email: true,
  phone: true,
  source: true,
  status: true,
  notes: true,
  metadata: true,
});

export type InsertLead = z.infer<typeof insertLeadSchema>;
export type Lead = typeof leads.$inferSelect;

// Appointments
export const appointments = pgTable("appointments", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email"),
  customerPhone: text("customer_phone"),
  appointmentDate: timestamp("appointment_date").notNull(),
  duration: integer("duration").notNull(), // in minutes
  status: text("status").default("scheduled").notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const appointmentsRelations = relations(appointments, ({ one }) => ({
  user: one(users, {
    fields: [appointments.userId],
    references: [users.id],
  }),
}));

export const insertAppointmentSchema = createInsertSchema(appointments).pick({
  userId: true,
  customerName: true,
  customerEmail: true,
  customerPhone: true,
  appointmentDate: true,
  duration: true,
  status: true,
  notes: true,
});

export type InsertAppointment = z.infer<typeof insertAppointmentSchema>;
export type Appointment = typeof appointments.$inferSelect;

// User Preferences
export const userPreferences = pgTable("user_preferences", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  industry: text("industry"),
  businessSize: text("business_size"),
  interests: json("interests").default([]),
  preferredLanguages: json("preferred_languages").default([]),
  preferredTools: json("preferred_tools").default([]),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const userPreferencesRelations = relations(userPreferences, ({ one }) => ({
  user: one(users, {
    fields: [userPreferences.userId],
    references: [users.id],
  }),
}));

export const insertUserPreferencesSchema = createInsertSchema(userPreferences).pick({
  userId: true,
  industry: true,
  businessSize: true,
  interests: true,
  preferredLanguages: true,
  preferredTools: true,
});

export type InsertUserPreferences = z.infer<typeof insertUserPreferencesSchema>;
export type UserPreferences = typeof userPreferences.$inferSelect;

// AI Recommendations
export const aiRecommendations = pgTable("ai_recommendations", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  toolId: integer("tool_id").references(() => aiTools.id),
  toolType: toolTypeEnum("tool_type").notNull(),
  toolName: text("tool_name").notNull(),
  score: integer("score").notNull(),
  reason: text("reason").notNull(),
  metadata: json("metadata"),
  clicked: boolean("clicked").default(false),
  implemented: boolean("implemented").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const aiRecommendationsRelations = relations(aiRecommendations, ({ one }) => ({
  user: one(users, {
    fields: [aiRecommendations.userId],
    references: [users.id],
  }),
  tool: one(aiTools, {
    fields: [aiRecommendations.toolId],
    references: [aiTools.id],
  }),
}));

export const insertAiRecommendationSchema = createInsertSchema(aiRecommendations).pick({
  userId: true,
  toolId: true,
  toolType: true,
  toolName: true,
  score: true,
  reason: true,
  metadata: true,
  clicked: true,
  implemented: true,
});

export type InsertAiRecommendation = z.infer<typeof insertAiRecommendationSchema>;
export type AiRecommendation = typeof aiRecommendations.$inferSelect;

// User Activity Tracking
export const userActivities = pgTable("user_activities", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  activityType: text("activity_type").notNull(),
  entityType: text("entity_type").notNull(),
  entityId: integer("entity_id"),
  metadata: json("metadata"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const userActivitiesRelations = relations(userActivities, ({ one }) => ({
  user: one(users, {
    fields: [userActivities.userId],
    references: [users.id],
  }),
}));

export const insertUserActivitySchema = createInsertSchema(userActivities).pick({
  userId: true,
  activityType: true,
  entityType: true,
  entityId: true,
  metadata: true,
});

export type InsertUserActivity = z.infer<typeof insertUserActivitySchema>;
export type UserActivity = typeof userActivities.$inferSelect;
