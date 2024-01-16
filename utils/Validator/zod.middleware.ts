// middlewares/zodValidator.ts
import { NextApiRequest, NextApiResponse } from "next";
import { AnyZodObject } from "zod";

export const zodValidator =
  (schema: AnyZodObject) =>
  async (req: NextApiRequest, res: NextApiResponse, next: () => void) => {
    try {
      await schema.parse(req.body);

      next(); // Proceed to the next middleware or handler
    } catch (e: any) {
      return res.status(400).json({ error: e.errors[0].message });
    }
  };
