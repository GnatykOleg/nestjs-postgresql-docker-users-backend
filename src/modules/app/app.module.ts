import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import configuration from 'src/configurations/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      // Set isGlobal: true to be used globally
      isGlobal: true,

      // Load configuration
      load: [configuration],
    }),

    // Connecting Sequelize asynchronously
    SequelizeModule.forRootAsync({
      // Imports inside ConfigModule
      imports: [ConfigModule],

      // Then inject ConfigService
      // Pass in the array of dependencies that we want to inject into our Sequelize
      inject: [ConfigService],

      // Now we can use ConfigService

      // useFactory to dynamically add providers
      // Passing the variable configService as a parameter to a service of type ConfigService
      // We will receive the fields that are in our configuration
      useFactory: (configService: ConfigService) => ({
        // dialect: Specify which database we will work with
        dialect: 'postgres',

        // Next, we pass the fields to connect, access the variable and its get method, passing the keys
        port: configService.get('db_port'),
        host: configService.get('db_host'),
        username: configService.get('db_user'),
        password: configService.get('db_password'),
        database: configService.get('db_name'),

        // Passing additional parameters for more correct operation

        // Specify an array of models that will use any relationships
        models: [],

        // Automatic addition of models to the database
        autoLoadModels: true,

        // Синхронизация сущностей
        synchronize: true,
      }),
    }),
  ],
})
export class AppModule {}
