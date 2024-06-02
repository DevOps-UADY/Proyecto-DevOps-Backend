import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.development' });

export default () => ({
    host: '172.22.0.4', 
    port: parseInt(process.env.POSTGRES_PORT) || 5432,
    username: process.env.POSTGRES_USER || 'root',
    password: process.env.POSTGRES_PASSWORD || '',
    database: process.env.POSTGRES_DB || 'test',
    autoLoadEntities: true,
    synchronize: true,
    JWT_SECRET: process.env.JWT_SECRET || 'development'
});

