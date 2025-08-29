import winston, { format, level } from 'winston'
const { printf, combine, timestamp } = format;


const my_format = printf(({ level, message, timestamp, ...meta }) => {
    let logMessage = `${timestamp} ${level}:`;

    if (typeof message === "string") {
        logMessage += ` ${message}`;
    }

    if (typeof message === "object") {
        logMessage += ` ${JSON.stringify(message)}`;
    }

    return logMessage;
});


const logger = winston.createLogger({
    level: 'info',
    format: combine(
        timestamp(),
        my_format
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({filename : "api_tracking.log"}),
        new winston.transports.File({ filename: "error.log", level: "error" }),
        new winston.transports.File({filename : "securlty.log" , level : "warn"})
    ]
})

export {
    logger
}