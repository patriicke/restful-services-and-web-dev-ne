import { ConfigType, registerAs } from '@nestjs/config';

export const typeOrmRegToken = 'typeorm';

export const TypeOrmConfig = registerAs(typeOrmRegToken, () => ({
  type: process.env.TYPEORM_CONNECTION || 'postgres',
  url: process.env.TYPEORM_URL || '',
  entities: [process.env.TYPEORM_ENTITIES || 'src/modules/**/*entity.ts'],
  migrations: [
    process.env.TYPEORM_MIGRATIONS || 'src/database/migrations/**/*.ts',
  ],
  factories: [
    process.env.TYPEORM_SEEDING_FACTORIES || 'src/database/factories/**/*.ts',
  ],
  seeds: [process.env.TYPEORM_SEEDING_SEEDS || 'src/database/seeds/**/*.ts'],
  synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true' || true,
  logging: process.env.TYPEORM_LOGGING === 'true' || false,
  autoLoadEntities: process.env.TYPEORM_AUTOLOAD === 'true' || true,
  migrationsRun: process.env.TYPEORM_MIGRATIONS_RUN === 'true' || true,
  migrationsTableName:
    process.env.TYPEORM_MIGRATIONS_TABLE_NAME || 'migrations',
  cli: {
    entitiesDir: process.env.TYPEORM_ENTITIES_DIR || 'src/database/entities',
    migrationsDir:
      process.env.TYPEORM_MIGRATIONS_DIR || 'src/database/migrations',
    subscribersDir:
      process.env.TYPEORM_SUBSCRIBERS_DIR || 'src/database/subscribers',
  },
}));

export type ITypeOrmConfig = ConfigType<typeof TypeOrmConfig>;
