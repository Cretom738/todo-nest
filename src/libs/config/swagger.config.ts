import { NestApplication } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const setupOpenApi = (app: NestApplication) => {
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Todo API')
    .setDescription('API Description of TODO BACKEND APP')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('api/docs', app, document);
};
