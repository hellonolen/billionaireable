import { action } from "./_generated/server";
import { v } from "convex/values";

// ElevenLabs Text-to-Speech
export const textToSpeech = action({
    args: {
        text: v.string(),
    },
    handler: async (ctx, args) => {
        const apiKey = process.env.ELEVENLABS_API_KEY;
        
        if (!apiKey) {
            throw new Error("ELEVENLABS_API_KEY not configured");
        }
        
        // Rachel - clear, professional female voice (commonly available)
        const voiceId = "21m00Tcm4TlvDq8ikWAM";
        
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
                    },
                }),
            }
        );
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error("ElevenLabs error:", response.status, errorText);
            throw new Error(`ElevenLabs API error: ${response.status} - ${errorText}`);
        }
        
        const audioBuffer = await response.arrayBuffer();
        const bytes = new Uint8Array(audioBuffer);
        let binary = '';
        for (let i = 0; i < bytes.byteLength; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        const base64Audio = btoa(binary);
        
        return {
            audio: base64Audio,
            mimeType: "audio/mpeg",
        };
    },
});
