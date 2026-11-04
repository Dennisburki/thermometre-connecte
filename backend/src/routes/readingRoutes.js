
import express from "express";
import {createReading, getLatest, getHistory} from "../controllers/readingController.js"
import {authenticatePico, authenticateReader} from "../middleware/auth.js";
import {limitPicoRequests, limitReadRequests} from "../middleware/rateLimit.js";

const router = express.Router();

// Envoi des mesures : réservé au Pico.
router.post("/", authenticatePico, limitPicoRequests, createReading);

// Consultation : réservée aux téléphones autorisés.
router.get("/latest", authenticateReader, limitReadRequests, getLatest);
router.get("/history", authenticateReader, limitReadRequests, getHistory);

export default router;
