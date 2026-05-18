export type RuntimeConfig = {
  nodeEnv: string;
  apiPort: number;
  databaseUrl: string;
  redisUrl: string;
  objectStorageBucket: string;
  kmsKeyId: string;
};

export const runtimeConfigKeys = [
  'NODE_ENV',
  'API_PORT',
  'DATABASE_URL',
  'REDIS_URL',
  'OBJECT_STORAGE_BUCKET',
  'KMS_KEY_ID'
] as const;
