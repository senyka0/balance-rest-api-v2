import { Request, Response } from "express";
import { start } from "../utils/tracking";
let id: NodeJS.Timer;

export const startTracking = async (req: Request, res: Response) => {
  try {
    clearInterval(id);
    id = start();
    res.status(200).json({ message: "Started" });
  } catch (e) {
    res.status(500).json({ error: (e as Error).message });
  }
};
