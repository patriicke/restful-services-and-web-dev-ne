import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigKeyPaths } from '~/config';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService<ConfigKeyPaths>) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: this.configService.get('typeorm.type'),
      url: this.configService.get('typeorm.url'),
      synchronize: this.configService.get('typeorm.synchronize'),
      dropSchema: false,
      keepConnectionAlive: true,
      logging: this.configService.get('typeorm.logging'),
      entities: [__dirname + '/../modules/**/*.entity{.ts,.js}'],
      migrations: [__dirname + './migrations/**/*{.ts,.js}'],
      seeds: [__dirname + './seeds/**/*{.ts,.js}'],
      factories: [__dirname + './factories/**/*{.ts,.js}'],
      cli: {
        entitiesDir: 'src',
        migrationsDir: 'src/database/migrations',
        subscribersDir: 'subscriber',
      },
    } as TypeOrmModuleOptions;
  }
}
