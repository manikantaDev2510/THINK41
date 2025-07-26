import dotenv from 'dotenv';
dotenv.config();

export const ENV_VARS = {
    MONGODB: process.env.MONGODB,
    PORT: process.env.PORT || 8080,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY
};