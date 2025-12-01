import { GoogleGenAI } from "@google/genai";

export const generateCode = async (userPrompt: string): Promise<string> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      throw new Error("API Key not found");
    }

    const ai = new GoogleGenAI({ apiKey });
    
    // Using gemini-2.5-flash for speed
    const modelId = 'gemini-2.5-flash';

    const systemPrompt = `
      You are an expert Frontend Engineer. 
      Your task is to generate a complete, single-file HTML document based on the user's request.
      
      Rules:
      1. Include all CSS within <style> tags in the <head>.
      2. Include all JavaScript within <script> tags.
      3. Use Tailwind CSS via CDN if styling is needed (<script src="https://cdn.tailwindcss.com"></script>).
      4. Make the design modern, responsive, and beautiful (Mobile First).
      5. IMPORTANT: Return ONLY the raw HTML code. Do not wrap it in markdown code blocks.
    `;

    const response = await ai.models.generateContent({
      model: modelId,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.3,
      },
      contents: userPrompt,
    });

    let code = response.text || "";

    // Cleanup markdown
    code = code.replace(/^```html\s*/, '').replace(/^```\s*/, '').replace(/```$/, '');
    
    return code.trim();

  } catch (error) {
    console.error("Error generating code:", error);
    throw error;
  }
};