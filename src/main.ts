// External imports from NestJS
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

// Application imports
import { AppModule } from './app.module';

// Utilities and middleware
import * as cookieParser from 'cookie-parser';

// Server configuration
const PORT = process.env.PORT || 3000;

async function bootstrap() {
  // Create the NestJS application instance
  const app = await NestFactory.create(AppModule);

  // Global middleware configurations
  app.useGlobalPipes(new ValidationPipe()); // Setup global validation pipe for DTOs
  app.use(cookieParser()); // Parse cookies from the request
  app.enableCors({
    origin: true, // Accept requests from any origin
    credentials: true, // Allow sending of cookies with requests from the frontend
  });

  // Start the server
  await app.listen(PORT);
  console.log(`Server started on http://localhost:${PORT}/graphql`);
}

// Initialize the application
bootstrap();
