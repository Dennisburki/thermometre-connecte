
import express from "express";
import readingRoutes from "./routes/readingRoutes.js";

const app = express();

// Render utilise un proxy devant le serveur.
app.set("trust proxy", 1);

// Masque la technologie utilisée.
app.disable("x-powered-by");

// en-têtes de sécurité.
app.use((req, res, next) =>
{
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader("Referrer-Policy", "no-referrer");
    res.setHeader("Cache-Control", "no-store");
    next();
});

// Limite les requêtes JSON à 10 Ko.
app.use(express.json({
    limit: "10kb",
    strict: true
}));

// Route de vérification du fonctionnement de l'API.
app.get("/health", (req, res) =>
{
    res.status(200).json({
        status: "ok"
    });
});

// Routes du thermomètre.
app.use("/mesures", readingRoutes);

// Gestion des erreurs.
app.use((error, req, res, next) =>
{
    if (error?.type === "entity.too.large")
    {
        return res.status(413).json({
            message: "Requête trop volumineuse"
        });
    }

    if (
        error instanceof SyntaxError &&
        error.status === 400 &&
        "body" in error
    )
    {
        return res.status(400).json({
            message: "JSON invalide"
        });
    }

    console.error("Erreur serveur :", error);

    return res.status(500).json({
        message: "Erreur interne du serveur"
    });
});

export default app;
