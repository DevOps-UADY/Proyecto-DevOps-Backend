import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.development' });

export default () => ({
    host: process.env.HOST || 'localhost',
    port: 3306,
    username: process.env.MYSQL_USERNAME || 'root',
    password: process.env.MYSQL_ROOT_PASSWORD || '',
    database: process.env.MYSQL_DATABASE || 'test',
    autoLoadEntities: true,
    synchronize: true,
  });
