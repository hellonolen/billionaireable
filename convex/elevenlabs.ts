import { action } from "./_generated/server";
import { v } from "convex/values";

export const textToSpeech = action({
    args: {
        text: v.string(),
        voiceId: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const apiKey = process.env.ELEVENLABS_API_KEY;
        
        if (!apiKey) {
            throw new Error("ELEVENLABS_API_KEY not configured");
        }
        
        // Default to "Adam" - deep, authoritative male voice
        // Other good options:
        // "pNInz6obpgDQGcFmaJgB" - Adam (deep, authoritative)
        // "ErXwobaYiN019PkySvjV" - Antoni (calm, confident)
        // "VR6AewLTigWG4xSOukaG" - Arnold (strong, commanding)
        // "yoZ06aMxZJJ28mfd3POQ" - Sam (confident, clear)
        const voiceId = args.voiceId || "pNInz6obpgDQGcFmaJgB"; // Adam
        
        const response = await fetch(
            `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
            {
                method: "POST",
                headers: {
                    "Accept": "audio/mpeg",
                    "Content-Type": "application/json",
                    "xi-api-key": apiKey,
                },
                body: JSON.stringify({
                    text: args.text,
                    model_id: "eleven_monolingual_v1",
                    voice_settings: {
                        stability: 0.5,
                        similarity_boost: 0.75,
                        style: 0.5,
                        use_speaker_boost: true,
                    },
                }),
            }
        );
        
        if (!response.ok) {
            const error = await response.text();
            console.error("ElevenLabs error:", error);
            throw new Error(`ElevenLabs API error: ${response.status}`);
        }
        
        const audioBuffer = await response.arrayBuffer();
        const base64Audio = Buffer.from(audioBuffer).toString("base64");
        
        return {
            audio: base64Audio,
            mimeType: "audio/mpeg",
        };
    },
});

