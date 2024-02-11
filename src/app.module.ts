import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { BillingModule } from './billing/billing.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    // Config module
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    // GraphQL module
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        autoSchemaFile: 'src/schema.gql',
        sortSchema: true,
        playground: true,
        debug: configService.get<boolean>('DEBUG'),
      }),
    }),
    // Mongo module
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('MONGO_URI'),
      }),
    }),
    UsersModule,
    BillingModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
