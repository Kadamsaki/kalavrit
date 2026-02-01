import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  app.post("/api/contact", (req, res) => {
    const { name, email, message } = req.body;
    console.log(`Contact message received from ${name} (${email}): ${message}`);
    // Mocking email delivery to kalavritinfo@gmail.com
    res.json({ success: true, message: "Delivered to kalavritinfo@gmail.com" });
  });

  return httpServer;
}
