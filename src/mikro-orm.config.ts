import { LoadStrategy, Options } from '@mikro-orm/core';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';

const isTest = process.env.DB_DIALECT === 'sqlite'

const config: Options = {
  entities: ['./dist/entities/**/*.js'],
  entitiesTs: ['./src/**/*.entity.ts'],
  metadataProvider: TsMorphMetadataProvider,
  forceUtcTimezone: true,
  autoJoinOneToOneOwner: true,
  type: process.env.DB_DIALECT || 'postgresql',
  debug: true,
  dbName: process.env.DB_NAME,
  highlighter: new SqlHighlighter(),
  clientUrl: process.env.DB_URI,
  propagateToOneOwner: true,
  migrations: {
    disableForeignKeys: false,
    path: isTest? './__tests__/migrations' : './migrations'
  },
  loadStrategy: LoadStrategy.JOINED
};

export default config;
