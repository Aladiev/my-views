const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const config = {
  mongodb: {
    url: process.env.MONGODB_URL ?? 'mongodb://localhost:27017',
    options: {
      authSource: process.env.MONGODB_AUTH_SOURCE,
    },
  },
  migrationsDir: 'migrations',
  changelogCollectionName: 'changelog',
  migrationFileExtension: '.js',
  useFileHash: false,
};

module.exports = config;
