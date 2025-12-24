import { v } from "convex/values";
import { action } from "./_generated/server";

// Web search using Google Custom Search API
export const search = action({
  args: {
    query: v.string(),
    numResults: v.optional(v.number()),
  },
  handler: async (_ctx, args) => {
    const apiKey = process.env.GOOGLE_SEARCH_API_KEY;
    const searchEngineId = process.env.GOOGLE_SEARCH_ENGINE_ID;
    
    if (!apiKey || !searchEngineId) {
      // If not configured, return empty results
      console.log("Google Search API not configured");
      return { results: [], error: "Search not configured" };
    }

    const numResults = args.numResults || 5;
    const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=${encodeURIComponent(args.query)}&num=${numResults}`;

    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        const error = await response.text();
        console.error("Google Search API error:", response.status, error);
        return { results: [], error: `Search failed: ${response.status}` };
      }

      const data = await response.json();
      
      const results = (data.items || []).map((item: any) => ({
        title: item.title,
        link: item.link,
        snippet: item.snippet,
      }));

      return { results, error: null };
    } catch (error) {
      console.error("Search error:", error);
      return { results: [], error: "Search failed" };
    }
  },
});

// Chat with web search capability - B can search when she needs current info
export const chatWithSearch = action({
  args: {
    message: v.string(),
    history: v.array(v.object({
      role: v.string(),
      text: v.string(),
    })),
    systemPrompt: v.string(),
  },
  handler: async (ctx, args) => {
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      throw new Error("Gemini API key not configured");
    }

    // First, determine if we need to search
    const needsSearchPrompt = `Based on this user message, do they need current/real-time information that would require a web search? 
Message: "${args.message}"

Reply with ONLY "SEARCH: <query>" if a search is needed, or "NO_SEARCH" if not.
Examples of when to search: current stock prices, recent news, specific company info, current regulations, recent events.
Examples of when NOT to search: general advice, framework questions, mindset questions, platform-specific questions.`;

    const checkResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: needsSearchPrompt }] }],
          generationConfig: { temperature: 0.1, maxOutputTokens: 100 },
        }),
      }
    );

    let searchResults = "";
    
    if (checkResponse.ok) {
      const checkData = await checkResponse.json();
      const checkText = checkData.candidates?.[0]?.content?.parts?.[0]?.text || "";
      
      if (checkText.startsWith("SEARCH:")) {
        const searchQuery = checkText.replace("SEARCH:", "").trim();
        const searchResult = await search.handler(ctx, { query: searchQuery, numResults: 3 });
        
        if (searchResult.results.length > 0) {
          searchResults = `\n\n[Web Search Results for "${searchQuery}"]\n`;
          searchResult.results.forEach((r: any, i: number) => {
            searchResults += `${i + 1}. ${r.title}\n   ${r.snippet}\n   Source: ${r.link}\n\n`;
          });
        }
      }
    }

    // Now generate the actual response with search context if available
    const enhancedSystemPrompt = searchResults 
      ? `${args.systemPrompt}\n\n## CURRENT WEB INFORMATION:\n${searchResults}\nUse this information if relevant to answer the user's question.`
      : args.systemPrompt;

    const contents = [
      { role: "user", parts: [{ text: enhancedSystemPrompt }] },
      { role: "model", parts: [{ text: "Understood. I am B. I have full knowledge of the 12 milestones and I'm ready to guide." }] },
      ...args.history.map((msg) => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.text }],
      })),
      { role: "user", parts: [{ text: args.message }] },
    ];

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents,
          generationConfig: { temperature: 0.8, topK: 40, topP: 0.95, maxOutputTokens: 1024 },
        }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error("Gemini API error:", response.status, error);
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "Let's refocus. What are you working on?";
  },
});

