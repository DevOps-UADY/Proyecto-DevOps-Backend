import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.development' });

export default () => ({
    host: process.env.POSTGRES_HOST || '172.17.0.2', 
    port: parseInt(process.env.POSTGRES_PORT) || 5432,
    username: process.env.POSTGRES_USER || 'root',
    password: process.env.POSTGRES_PASSWORD || '',
    database: process.env.POSTGRES_DB || 'test',
    autoLoadEntities: true,
    synchronize: true,
    JWT_SECRET: process.env.JWT_SECRET || 'development'
});
