import { v } from "convex/values";
import { action } from "./_generated/server";
import { textToSpeech as openaiTextToSpeech } from "./openai";

// Text-to-Speech. Primary: Gemini TTS. Fallback: OpenAI TTS if configured.
export const textToSpeech = action({
  args: {
    text: v.string(),
  },
  handler: async (ctx, args) => {
    const geminiKey = process.env.GEMINI_API_KEY;

    // If Gemini isn't configured, fall back to OpenAI if available.
    if (!geminiKey) {
      return await openaiTextToSpeech.handler(ctx, args as any);
    }

    // Use a known Gemini TTS-capable model. (This previously worked in your app.)
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key=${geminiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: args.text }] }],
          generationConfig: {
            responseModalities: ["AUDIO"],
            speechConfig: {
              voiceConfig: { prebuiltVoiceConfig: { voiceName: "Kore" } },
            },
          },
        }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error("Gemini TTS API error:", response.status, error);
      // Gemini failed: try OpenAI if configured.
      try {
        return await openaiTextToSpeech.handler(ctx, args as any);
      } catch (_e) {
        throw new Error(`Gemini TTS API error: ${response.status}`);
      }
    }

    const data: any = await response.json();
    const audioPart = data.candidates?.[0]?.content?.parts?.find((part: any) => part.inlineData);
    if (!audioPart?.inlineData?.data) {
      console.error("No audio in Gemini response:", JSON.stringify(data));
      // Try OpenAI if Gemini returns a shape we can't parse.
      try {
        return await openaiTextToSpeech.handler(ctx, args as any);
      } catch (_e) {
        throw new Error("No audio in response");
      }
    }

    // Gemini returns PCM 16-bit 24kHz audio - add WAV headers.
    const pcmBase64 = audioPart.inlineData.data as string;
    const wavBase64 = addWavHeaders(pcmBase64, 24000, 16, 1);
    return { audio: wavBase64, mimeType: "audio/wav" };
  },
});

// Polyfill for atob/btoa in environments where they might be missing or strict
const b64chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

function decodeBase64(str: string): Uint8Array {
  // Remove whitespace
  str = str.replace(/\s/g, '');
  
  // Pad if necessary
  while (str.length % 4 !== 0) {
    str += '=';
  }
  
  const len = str.length;
  let bufferLength = len * 3 / 4;
  if (str.endsWith('==')) bufferLength -= 2;
  else if (str.endsWith('=')) bufferLength -= 1;
  
  const buffer = new Uint8Array(bufferLength);
  
  let i = 0;
  let p = 0;
  
  while (i < len) {
    const c1 = b64chars.indexOf(str[i++]);
    const c2 = b64chars.indexOf(str[i++]);
    const c3 = b64chars.indexOf(str[i++]);
    const c4 = b64chars.indexOf(str[i++]);
    
    const b1 = (c1 << 2) | (c2 >> 4);
    const b2 = ((c2 & 15) << 4) | (c3 >> 2);
    const b3 = ((c3 & 3) << 6) | c4;
    
    buffer[p++] = b1;
    if (c3 !== 64) buffer[p++] = b2;
    if (c4 !== 64) buffer[p++] = b3;
  }
  
  return buffer;
}

function encodeBase64(bytes: Uint8Array): string {
  let result = '';
  let i = 0;
  const len = bytes.length;
  
  while (i < len) {
    const b1 = bytes[i++];
    const b2 = i < len ? bytes[i++] : NaN;
    const b3 = i < len ? bytes[i++] : NaN;
    
    const c1 = b1 >> 2;
    const c2 = ((b1 & 3) << 4) | (Number.isNaN(b2) ? 0 : b2 >> 4);
    const c3 = Number.isNaN(b2) ? 64 : ((b2 & 15) << 2) | (Number.isNaN(b3) ? 0 : b3 >> 6);
    const c4 = Number.isNaN(b3) ? 64 : b3 & 63;
    
    result += b64chars[c1] + b64chars[c2] + b64chars[c3] + b64chars[c4];
  }
  
  return result;
}

// Convert raw PCM to WAV by adding headers
function addWavHeaders(pcmBase64: string, sampleRate: number, bitsPerSample: number, channels: number): string {
  // Decode base64 PCM data using custom decoder
  const pcmData = decodeBase64(pcmBase64);
  
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

  // Convert to base64 using custom encoder
  return encodeBase64(wavData);
}

function writeString(view: DataView, offset: number, str: string) {
  for (let i = 0; i < str.length; i++) {
    view.setUint8(offset + i, str.charCodeAt(i));
  }
}
