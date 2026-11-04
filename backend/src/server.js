
import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import {connectDB} from "./config/db.js";
import {validateSecurityConfig} from "./middleware/auth.js";

const PORT = process.env.PORT || 4000;

async function startServer()
{
    try
    {
        // Vérifie les secrets avant de démarrer.
        validateSecurityConfig();

        // Connexion à MongoDB.
        await connectDB();

        // Démarrage de l'API.
        app.listen(PORT, "0.0.0.0", () =>
        {
            console.log(`API démarrée sur le port ${PORT}`);
        });

    } catch (error)
    {
        console.error("Impossible de démarrer l'API :", error);
        process.exit(1);
    }
}

startServer();
