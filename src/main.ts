import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { ConfigService } from '@nestjs/config';
import { setupOpenApi } from './libs/config/swagger.config';
import { ValidationPipe } from '@nestjs/common';
import { PrismaErrorFilter } from './libs/filters/prisma-error.filter';

async function bootstrap() {
    const app = await NestFactory.create<NestApplication>(AppModule);

    app.useGlobalFilters(new PrismaErrorFilter());

    app.useGlobalPipes(new ValidationPipe({
        transform: true
    }));

    const configService = app.get<ConfigService>(ConfigService);

    if (configService.get('NODE_ENV') !== 'production') {
        setupOpenApi(app);
    }

    const port = configService.get('PORT');

    await app.listen(port);
}
bootstrap();
