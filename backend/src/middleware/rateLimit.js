
const clients = new Map();

export function rateLimit({windowMs, max, message})
{
    return (req, res, next) =>
    {
        const key = req.ip || req.socket.remoteAddress || "unknown";
        const now = Date.now();

        let entry = clients.get(key);

        if (!entry || now - entry.startedAt >= windowMs)
        {
            entry = {
                startedAt: now,
                count: 0
            };
        }

        entry.count += 1;
        clients.set(key, entry);

        // Nettoyage périodique des anciennes entrées.
        if (clients.size > 5000)
        {
            for (const [ clientKey, clientEntry ] of clients)
            {
                if (now - clientEntry.startedAt >= windowMs)
                {
                    clients.delete(clientKey);
                }
            }

            while (clients.size > 5000)
            {
                const oldestKey = clients.keys().next().value;

                if (oldestKey === undefined) break;

                clients.delete(oldestKey);
            }
        }

        if (entry.count > max)
        {
            const retryAfterSeconds = Math.max(
                1,
                Math.ceil(
                    (windowMs - (now - entry.startedAt)) / 1000
                )
            );

            res.setHeader("Retry-After", String(retryAfterSeconds));

            return res.status(429).json({
                message
            });
        }

        next();
    };
}

// Limitation des envois du Pico.
export const limitPicoRequests = rateLimit({
    windowMs: 60 * 1000,
    max: 120,
    message: "Trop de mesures envoyées. Réessaie dans une minute."
});

// Limitation des consultations depuis les téléphones.
export const limitReadRequests = rateLimit({
    windowMs: 60 * 1000,
    max: 120,
    message: "Trop de consultations. Réessaie dans une minute."
});
