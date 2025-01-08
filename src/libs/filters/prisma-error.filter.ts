import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Response } from 'express';

@Catch(PrismaClientKnownRequestError)
export class PrismaErrorFilter implements ExceptionFilter {
  private readonly logger: Logger = new Logger(PrismaErrorFilter.name);

  catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost): void {
    const response = host.switchToHttp().getResponse<Response>();

    this.logger.error(exception.message);

    let nestException: HttpException = new BadRequestException(
      'something_went_wrong',
    );

    if (
      exception instanceof PrismaClientKnownRequestError &&
      exception.code === 'P2025'
    ) {
      nestException = new NotFoundException('not_found');
    }

    response
      .status(nestException.getStatus())
      .json(nestException.getResponse());
  }
}
