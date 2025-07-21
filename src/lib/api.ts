import { ChatMessage, GeminiResponse } from '@/types'

export class GeminiAPI {
  static async generateContent(messages: ChatMessage[]): Promise<string> {
    const response = await fetch('/api/gemini', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages,
        type: 'chat'
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ 
        error: "Respons error tidak valid."
      }));
      throw new Error(errorData.error || `API Error: ${response.status}`);
    }

    const result = await response.json();
    
    if (result.text) {
      return result.text;
    }

    throw new Error('Struktur respons tidak sesuai');
  }

  static async imagineImage(imageBase64: string, imageMimeType: string): Promise<string> {
    const prompt = "Buatkan deskripsi yang sangat kreatif, puitis, atau cerita pendek yang imajinatif berdasarkan gambar ini. Berikan detail yang menarik dan unik, hindari pengulangan dari deskripsi gambar standar.";
    
    const messages: ChatMessage[] = [{
      role: "user",
      parts: [
        { text: prompt },
        { inlineData: { mimeType: imageMimeType, data: imageBase64 } }
      ]
    }];

    const response = await fetch('/api/gemini', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages,
        type: 'imagine'
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ 
        error: "Respons error tidak valid."
      }));
      throw new Error(errorData.error || `API Error: ${response.status}`);
    }

    const result = await response.json();
    
    if (result.text) {
      return result.text;
    }

    throw new Error('Struktur respons tidak sesuai');
  }

  static async summarizeConversation(conversationText: string): Promise<string> {
    const prompt = `Anda adalah AIREN-AI, AI yang dibuat oleh Rendi Irawan. Tolong buatkan ringkasan yang singkat, padat, dan informatif dari percakapan berikut. Fokus pada poin-poin utama dan pertanyaan penting jika ada. Sampaikan ringkasan ini seolah-olah Anda (AIREN-AI) yang menyajikannya:\n\n${conversationText}`;
    
    const messages: ChatMessage[] = [{
      role: "user",
      parts: [{ text: prompt }]
    }];

    const response = await fetch('/api/gemini', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages,
        type: 'summarize'
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ 
        error: "Respons error tidak valid."
      }));
      throw new Error(errorData.error || `API Error: ${response.status}`);
    }

    const result = await response.json();
    
    if (result.text) {
      return result.text;
    }

    throw new Error('Struktur respons tidak sesuai');
  }
} 