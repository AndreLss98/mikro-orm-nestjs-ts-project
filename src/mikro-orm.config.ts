import { LoadStrategy, Options } from '@mikro-orm/core';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';

const config: Options = {
  entities: ['./dist/entities/**/*.js'],
  entitiesTs: ['./src/**/*.entity.ts'],
  metadataProvider: TsMorphMetadataProvider,
  forceUtcTimezone: true,
  autoJoinOneToOneOwner: true,
  type: 'postgresql',
  debug: true,
  highlighter: new SqlHighlighter(),
  clientUrl: process.env.POSTGRES_URI,
  propagateToOneOwner: true,
  migrations: {
    disableForeignKeys: false,
  },
  loadStrategy: LoadStrategy.JOINED,
};

export default config;
