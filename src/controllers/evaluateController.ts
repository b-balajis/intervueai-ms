import { Request, Response } from "express";
import { evaluateWithGemini } from "../services/gemini";

export const evaluate = async (req: Request, res: Response): Promise<void> => {
    try {
        const { question, answer }: { question?: string; answer?: string } = req.body;

        if (!question || !answer) {
            res.status(400).json({ error: "Missing question or answer" });
            return;
        }

        try {
            const evaluation = await evaluateWithGemini(question, answer);
            res.json(evaluation);
        } catch (err) {
            res.status(500).json({ error: "Evaluation failed" });
        }

    } catch (error) {
        res.status(500).json({ message: "Error" });
    }
};
