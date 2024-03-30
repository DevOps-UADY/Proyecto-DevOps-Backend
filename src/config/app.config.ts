import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.development' });

export default () => ({
    host: '172.19.0.2',
    port: 3306,
    username: process.env.MYSQL_USERNAME || 'root',
    password: process.env.MYSQL_ROOT_PASSWORD || '',
    database: process.env.MYSQL_DATABASE || 'test',
    autoLoadEntities: true,
    synchronize: true,
    JWT_SECRET:process.env.JWT_SECRET || 'development'
  });
