import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

function requiredEnv(env: string): string {
  if (process.env[env] === undefined)
    throw Error(`Required environment ${env} is not provided`);

  return process.env[env];
}

export default () => ({
  port: parseInt(process.env.PORT, 10) || 5002,
  pgConnectionString: requiredEnv('PG_CONNECTION_STRING'),
});
