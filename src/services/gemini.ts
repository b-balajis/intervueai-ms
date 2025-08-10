// import { evaluateCandidate } from "../services/geminiService";

// const report = await evaluateCandidate(answers);


import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export async function evaluateWithGemini(question: string, answer: string) {
  const prompt = `
You are a technical evaluator for web development interviews.

Evaluate the following answer to the question.
Question: "${question}"
Candidate Answer: "${answer}"

Please respond with:
- Score (out of 10)
- Feedback on correctness, clarity, and completeness
- Mention any missing concepts

Return your response in this format:
{
  "score": <number>,
  "feedback": "<string>"
}
`;

  try {
    const res = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-pro:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );



    const text = res.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    const jsonMatch = text?.match(/{[\s\S]*}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    } else {
      return { score: 0, feedback: 'Unable to parse response' };
    }
  } catch (err) {
    console.error('Gemini error:', err);
    throw new Error('Failed to evaluate answer');
  }
}
