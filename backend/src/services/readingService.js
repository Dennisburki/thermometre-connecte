
import Reading from "../models/Reading.js";

// Dernière mesure reçue : conservée en mémoire pour l'application.
let latestReading = null;

// Créneaux d'enregistrement, en heure de Paris.
const SLOTS = [ 8, 12, 18, 23 ];

function invalidData(message)
{
    const error = new Error(message);
    error.statusCode = 400;
    return error;
}

function validateReading(data)
{
    if (
        !data ||
        typeof data !== "object" ||
        Array.isArray(data)
    )
    {
        throw invalidData("Format de mesure invalide");
    }

    const requiredFields = [
        "temperature",
        "humidite",
        "pression",
        "timestamp"
    ];

    for (const field of requiredFields)
    {
        if (
            !Object.prototype.hasOwnProperty.call(data, field) ||
            typeof data[ field ] !== "number" ||
            !Number.isFinite(data[ field ])
        )
        {
            throw invalidData(`Champ invalide : ${field}`);
        }
    }

    if (data.temperature < -40 || data.temperature > 85)
    {
        throw invalidData("Température hors limites");
    }

    if (data.humidite < 0 || data.humidite > 100)
    {
        throw invalidData("Humidité hors limites");
    }

    if (data.pression < 300 || data.pression > 1100)
    {
        throw invalidData("Pression hors limites");
    }

    const measuredAt = new Date(data.timestamp * 1000);

    if (Number.isNaN(measuredAt.getTime()))
    {
        throw invalidData("Date de mesure invalide");
    }

    const now = Date.now();
    const measuredTime = measuredAt.getTime();

    if (measuredTime > now + 5 * 60 * 1000)
    {
        throw invalidData("La date de mesure est trop avancée");
    }

    if (measuredTime < now - 48 * 60 * 60 * 1000)
    {
        throw invalidData("La mesure est trop ancienne");
    }

    return measuredAt;
}

export async function processReading(data)
{
    const measuredAt = validateReading(data);
    const receivedAt = new Date();

    const readingData = {
        temperature: data.temperature,
        humidity: data.humidite,
        pressure: data.pression,
        date: measuredAt,
        receivedAt
    };

    if (
        latestReading === null ||
        measuredAt >= latestReading.date
    )
    {
        latestReading = readingData;
    }

    // Heure de Paris correspondant à la date réelle de mesure.
    const parts = new Intl.DateTimeFormat("en-CA", {
        timeZone: "Europe/Paris",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        hourCycle: "h23"
    }).formatToParts(measuredAt);

    const values = Object.fromEntries(
        parts.map(part => [ part.type, part.value ])
    );

    const hour = Number(values.hour);
    const date = `${values.year}-${values.month}-${values.day}`;

    const availableSlots = SLOTS.filter(slot => hour >= slot);

    if (availableSlots.length === 0)
    {
        return {
            saved: false,
            message: "Mesure reçue, aucun créneau atteint"
        };
    }

    const slot = availableSlots[ availableSlots.length - 1 ];
    const slotKey = `${date}-${String(slot).padStart(2, "0")}`;

    const result = await Reading.updateOne(
        {slotKey},
        {
            $setOnInsert: {
                temperature: readingData.temperature,
                humidity: readingData.humidity,
                pressure: readingData.pressure,
                slotKey,
                date: measuredAt,
                receivedAt
            }
        },
        {upsert: true}
    );

    return {
        saved: result.upsertedCount === 1,
        message: result.upsertedCount === 1
            ? "Mesure enregistrée"
            : "Créneau déjà enregistré"
    };
}

export function getLatestReading()
{
    return latestReading;
}

export async function getReadingHistory(limit = 100)
{
    return await Reading.find()
        .sort({date: -1})
        .limit(limit)
        .lean();
}
