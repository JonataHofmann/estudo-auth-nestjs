import { CreateUser1661284972443 } from './migrations/1661284972443-CreateUser';
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import User from './src/user/entities/user.entity';
config();

const configService = new ConfigService();

export default new DataSource({
  type: 'mysql',
  host: configService.get('DATABASE_HOST'),
  port: configService.get('DATABASE_PORT'),
  username: configService.get('DATABASE_USER'),
  password: configService.get('DATABASE_PASSWORD'),
  database: configService.get('DATABASE_DB'),
  entities: [User],
  migrations: [CreateUser1661284972443],
});
