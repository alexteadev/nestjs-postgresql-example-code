import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);

    const corsO = configService.get('CORS_ORIGIN')?.split(',') || [];
    if (corsO.length) {
        const corsOptions = {
            origin: corsO,
            credentials: true,
        };
        app.enableCors(corsOptions);
    }

    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    app.setGlobalPrefix('api');
    app.use(cookieParser());

    await app.listen(configService.get('LISTEN_PORT') || 5005);
}
bootstrap();
