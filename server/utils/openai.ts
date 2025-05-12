import OpenAI from "openai";

// The newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export interface RecommendationRequest {
  userId: number;
  userIndustry?: string;
  businessSize?: string;
  existingTools?: string[];
  interests?: string[];
  recentActions?: {
    type: string;
    entity: string;
    timestamp: Date;
  }[];
}

export interface ToolRecommendation {
  toolId: string;
  toolName: string;
  toolType: string;
  score: number;
  reason: string;
}

/**
 * Generates personalized AI tool recommendations based on user context and behavior
 */
export async function generateRecommendations(
  request: RecommendationRequest
): Promise<ToolRecommendation[]> {
  try {
    // Format the request data for the OpenAI API
    const prompt = `
      Generate personalized AI tool recommendations for a user with the following context:
      ${request.userIndustry ? `- Industry: ${request.userIndustry}` : ''}
      ${request.businessSize ? `- Business Size: ${request.businessSize}` : ''}
      ${request.existingTools && request.existingTools.length > 0 
        ? `- Currently using tools: ${request.existingTools.join(', ')}` 
        : '- No tools currently in use'}
      ${request.interests && request.interests.length > 0 
        ? `- Expressed interest in: ${request.interests.join(', ')}` 
        : ''}
      ${request.recentActions && request.recentActions.length > 0 
        ? `- Recent activities: ${request.recentActions.map(a => 
            `${a.type} ${a.entity} at ${a.timestamp.toISOString()}`).join(', ')}` 
        : '- No recent activities recorded'}

      Available AI tools are:
      1. WhatsApp Chatbot - Automate customer interactions through WhatsApp
      2. Customer Support Agent - AI-powered customer service automation
      3. Social Media Post Writer - Generate engaging social media content
      4. Custom GPT Bots - Build specialized AI chatbots for specific purposes
      5. Mini AI Websites - Simple AI-powered websites for small businesses
      6. Local Language AI Chat - AI chat in Indian regional languages
      7. Email Reply Generator - Automate personalized email responses
      8. Lead Collector AI - Capture and qualify potential customer leads
      9. Appointment Booking AI - Automated scheduling and booking system
      10. Business Analytics Dashboard - Track business performance metrics

      Provide 3 tool recommendations with the following information for each:
      - Tool ID (number from 1-10)
      - Tool Name (from the list above)
      - Tool Type (category)
      - Relevance Score (1-100)
      - Reason (brief explanation of why this tool is recommended)

      Format the response as a valid JSON array of objects.
    `;

    // Call the OpenAI API
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "You are a specialized AI business tool recommendation system for Indian small businesses." },
        { role: "user", content: prompt }
      ],
      response_format: { type: "json_object" },
      temperature: 0.5,
    });

    // Parse the response
    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error("No content in OpenAI response");
    }

    const parsedContent = JSON.parse(content);
    
    // Transform to expected format
    if (Array.isArray(parsedContent.recommendations)) {
      return parsedContent.recommendations.map((rec: any) => ({
        toolId: rec.toolId || rec.id || rec.tool_id || "",
        toolName: rec.toolName || rec.name || rec.tool_name || "",
        toolType: rec.toolType || rec.type || rec.tool_type || "",
        score: rec.score || rec.relevance_score || 0,
        reason: rec.reason || ""
      }));
    }
    
    return [];
  } catch (error) {
    console.error("Error generating recommendations:", error);
    throw error;
  }
}