import * as dotenv from 'dotenv';
dotenv.config();
import { ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { typeOrmConfig } from '@configs/typeorm.config';

const configService = new ConfigService();
const dataSourceOptions = typeOrmConfig(configService) as DataSourceOptions;
const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
