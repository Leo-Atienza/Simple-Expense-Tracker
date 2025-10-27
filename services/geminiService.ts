
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import type { Expense } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const getSpendingInsights = async (expenses: Expense[]): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("API key is missing.");
  }
  
  if (expenses.length === 0) {
    return "No expenses to analyze.";
  }

  const formattedExpenses = expenses.map(e => `- $${e.amount.toFixed(2)} on ${e.category} for "${e.description}" on ${new Date(e.date).toLocaleDateString()}`).join('\n');

  const prompt = `
    You are a friendly financial assistant. Analyze the following list of recent expenses and provide a short, helpful, and encouraging insight in 2-3 sentences. 
    Focus on the largest spending category or any interesting patterns. Do not use markdown formatting.

    Here are the expenses:
    ${formattedExpenses}
  `;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error fetching insights from Gemini API:", error);
    throw new Error("Failed to generate insights.");
  }
};
