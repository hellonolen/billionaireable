import { v } from "convex/values";
import { action } from "./_generated/server";

// Text-to-Speech using Gemini TTS model
export const textToSpeech = action({
  args: {
    text: v.string(),
  },
  handler: async (ctx, args) => {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      throw new Error("GEMINI_API_KEY not configured");
    }

    // Use Gemini 2.0 Flash Experimental for Audio Generation
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: `Please say the following text naturally and authoritatively: ${args.text}` }]
            }
          ],
          generationConfig: {
            responseModalities: ["AUDIO"],
            speechConfig: {
              voiceConfig: {
                prebuiltVoiceConfig: {
                  voiceName: "Kore" 
                }
              }
            }
          }
        }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error("Gemini TTS API error:", error);
      throw new Error(`Gemini TTS API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Extract audio from response - Gemini TTS returns inline audio data
    const audioPart = data.candidates?.[0]?.content?.parts?.find(
      (part: any) => part.inlineData
    );

    if (!audioPart?.inlineData) {
      console.error("No audio in Gemini response:", JSON.stringify(data));
      throw new Error("No audio in response");
    }

    // Gemini TTS returns PCM 16-bit 24kHz audio - we need to add WAV headers
    const pcmBase64 = audioPart.inlineData.data;
    const wavBase64 = addWavHeaders(pcmBase64, 24000, 16, 1);

    return {
      audio: wavBase64,
      mimeType: "audio/wav"
    };
  },
});

// Convert raw PCM to WAV by adding headers
function addWavHeaders(pcmBase64: string, sampleRate: number, bitsPerSample: number, channels: number): string {
  // Decode base64 PCM data
  const pcmData = Uint8Array.from(atob(pcmBase64), c => c.charCodeAt(0));
  
  const byteRate = sampleRate * channels * (bitsPerSample / 8);
  const blockAlign = channels * (bitsPerSample / 8);
  const dataSize = pcmData.length;
  const fileSize = 36 + dataSize;

  // Create WAV header (44 bytes)
  const header = new ArrayBuffer(44);
  const view = new DataView(header);

  // RIFF chunk descriptor
  writeString(view, 0, 'RIFF');
  view.setUint32(4, fileSize, true);
  writeString(view, 8, 'WAVE');

  // fmt sub-chunk
  writeString(view, 12, 'fmt ');
  view.setUint32(16, 16, true); // Subchunk1Size (16 for PCM)
  view.setUint16(20, 1, true); // AudioFormat (1 for PCM)
  view.setUint16(22, channels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, byteRate, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, bitsPerSample, true);

  // data sub-chunk
  writeString(view, 36, 'data');
  view.setUint32(40, dataSize, true);

  // Combine header and PCM data
  const wavData = new Uint8Array(44 + dataSize);
  wavData.set(new Uint8Array(header), 0);
  wavData.set(pcmData, 44);

  // Convert to base64
  let binary = '';
  for (let i = 0; i < wavData.length; i++) {
    binary += String.fromCharCode(wavData[i]);
  }
  return btoa(binary);
}

function writeString(view: DataView, offset: number, str: string) {
  for (let i = 0; i < str.length; i++) {
    view.setUint8(offset + i, str.charCodeAt(i));
  }
}
