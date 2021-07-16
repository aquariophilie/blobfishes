import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (envFound.error) {
  // This error should crash whole process
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

// Check
console.log(`DEBUG: process.env.SHELL=${process.env.SHELL}`);
console.log(`DEBUG: process.env.MONGODB_URI=${process.env.MONGODB_URI}`);
console.log(`DEBUG: process.env.MONGODB_USER=${process.env.MONGODB_USER}`);
console.log(`DEBUG: process.env.MONGODB_NAME=${process.env.MONGODB_NAME}`);

export default {
  /**
   * Your favorite port
   */
  port: parseInt(process.env.PORT || '3000', 10),

  /**
   * Database configurations
   */
  databaseURL: process.env.MONGODB_URI || '',
  databaseUser: process.env.MONGODB_USER || '',
  databasePass: process.env.MONGODB_PASS || '',
  databaseName: process.env.MONGODB_NAME || '',
  /**
   * Your secret sauce
   */
  jwtSecret: process.env.JWT_SECRET || '',
  jwtAlgorithm: process.env.JWT_ALGO || '',
  jwtExpiresIn: process.env.JWT_EXP || '4h',

  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },

  /**
   * API configs
   */
  api: {
    prefix: '/api',
  },
  apiKey: process.env.API_KEY || '',
  appVersion: process.env.npm_package_version
};
