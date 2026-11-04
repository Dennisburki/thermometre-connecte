
import {timingSafeEqual} from "node:crypto";

function isValidSecret(secret)
{
    return typeof secret === "string" && secret.length >= 32;
}

// Vérification de la configuration des secrets.
export function validateSecurityConfig()
{
    const picoToken = process.env.PICO_DEVICE_TOKEN;
    const readToken = process.env.READ_ACCESS_TOKEN;

    if (!isValidSecret(picoToken))
    {
        throw new Error(
            "PICO_DEVICE_TOKEN doit contenir au moins 32 caractères."
        );
    }

    if (!isValidSecret(readToken))
    {
        throw new Error(
            "READ_ACCESS_TOKEN doit contenir au moins 32 caractères."
        );
    }

    if (picoToken === readToken)
    {
        throw new Error(
            "Les jetons Pico et lecture doivent être différents."
        );
    }
}

// Compare les jetons sans comparaison de chaînes classique.
function tokenMatches(receivedToken, expectedToken)
{
    if (
        typeof receivedToken !== "string" ||
        !isValidSecret(expectedToken)
    )
    {
        return false;
    }

    const received = Buffer.from(receivedToken, "utf8");
    const expected = Buffer.from(expectedToken, "utf8");

    if (received.length !== expected.length)
    {
        return false;
    }

    return timingSafeEqual(received, expected);
}

// middleware d'authentification à partir d'une variable d'environnement.
function createBearerAuth(envName)
{
    return (req, res, next) =>
    {
        const authorization = req.get("authorization") || "";
        const match = authorization.match(/^Bearer\s+(.+)$/i);

        const receivedToken = match?.[ 1 ];

        if (!tokenMatches(receivedToken, process.env[ envName ]))
        {
            return res.status(401).json({
                message: "Authentification requise ou jeton invalide"
            });
        }

        next();
    };
}

// Authentification du Raspberry Pico.
export const authenticatePico =
    createBearerAuth("PICO_DEVICE_TOKEN");

// Authentification des téléphones.
export const authenticateReader =
    createBearerAuth("READ_ACCESS_TOKEN");
