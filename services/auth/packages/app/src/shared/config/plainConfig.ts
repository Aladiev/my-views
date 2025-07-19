export default () => ({
  secret: process.env.SECRET ?? 'test',
  expirationTimeInSeconds: Number(process.env.EXPIRATION_TIME ?? 60),
});