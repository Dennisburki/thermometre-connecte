
import {processReading, getLatestReading, getReadingHistory} from "../services/readingService.js";

export async function createReading(req, res)
{
    try
    {
        const result = await processReading(req.body);

        return res.status(201).json({
            message: result.message,
            saved: result.saved,
            latest: getLatestReading()
        });

    } catch (error)
    {
        if (error.statusCode === 400)
        {
            return res.status(400).json({
                message: error.message
            });
        }

        console.error("Erreur de traitement de la mesure :", error);

        return res.status(500).json({
            message: "Échec du traitement de la mesure"
        });
    }
}

export function getLatest(req, res)
{
    return res.json({
        data: getLatestReading()
    });
}

export async function getHistory(req, res)
{
    try
    {
        const limit = Math.min(
            Math.max(Number.parseInt(req.query.limit, 10) || 100, 1),
            500
        );

        const readings = await getReadingHistory(limit);

        return res.json({
            count: readings.length,
            data: readings
        });

    } catch (error)
    {
        console.error("Erreur de récupération de l'historique :", error);

        return res.status(500).json({
            message: "Impossible de récupérer l'historique"
        });
    }
}
