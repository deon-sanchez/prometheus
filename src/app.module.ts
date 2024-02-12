// External imports from NestJS and other libraries
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { APP_GUARD } from '@nestjs/core';

// Module imports from within the application
import { UsersModule } from './apps/users/users.module';
import { BillingModule } from './apps/billing/billing.module';
import { AuthModule } from './apps/auth/auth.module';

// Guard imports
import { JwtAuthGuard } from './apps/auth/jwt.guard';

@Module({
  imports: [
    // Global configuration module for environment variables
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),

    // Database module setup with async configuration
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),

    // GraphQL module setup with async configuration
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: async (configService: ConfigService) => ({
        autoSchemaFile: 'src/schema.gql',
        cors: {
          credentials: true,
          origin: true,
        },
        sortSchema: true,
        debug: configService.get<boolean>('DEBUG'),
        context: ({ req, res }) => ({ req, res }),
        playground: {
          settings: {
            'request.credentials': 'include',
          },
        },
      }),
      inject: [ConfigService],
    }),

    // Application feature modules
    UsersModule,
    BillingModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    // Application-wide guard for JWT authentication
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
