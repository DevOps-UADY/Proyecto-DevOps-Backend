import { Injectable, LoggerService } from '@nestjs/common';
import * as winston from 'winston';

@Injectable()
export class AppLogger implements LoggerService{
    private logger: winston.Logger;

    constructor () {
        this.logger = winston.createLogger({
            level: 'info',
            format: winston.format.combine(
                winston.format.timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss',
                }),
                winston.format.printf(({ timestamp, level, message }) => `${timestamp} [${level}]: ${message}`)
            ),
            transports: [
                new winston.transports.File({ filename: 'logs/application.log' }),
                new winston.transports.Console({
                format: winston.format.combine(
                    winston.format.colorize(),
                    winston.format.simple()
                )
                })
            ],
        });
    }

    log (message: string) {
        this.logger.log('info', message);
    }

    error (message: string, trace: string) {
        this.logger.error(`${message} ${trace}`);
    }

    warn (message: string) {
        this.logger.warn(message);
    }

    debug (message: string) {
        this.logger.debug(message);
    }

    verbose (message: string) {
        this.logger.verbose(message);
    }
    
}
