import { startTracking } from "./controllers/track.controller";
import { getBalance } from "./controllers/balance.controller";
import { Application, Request, Response } from "express";

export const routes = (app: Application) => {
  app.get("/api/healthcheck", (req: Request, res: Response) => res.status(200).json({ data: "Server is working" }));
  app.get("/api/balance/:address", getBalance);
  app.get("/api/track", startTracking);
  app.all("*", (req: Request, res: Response) => res.status(404).json({ error: "Endpoint doesn't exist" }));
};
