import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { Group } from './entities/Group';
import { Person } from './entities/Person';

const typeOrmConfig: PostgresConnectionOptions = {
	type: 'postgres',
	host: 'localhost',
	port: 5432,
	username: 'postgres',
	password: '',
	database: 'nestor',
	synchronize: true,
	logging: false,
	entities: [Person, Group],
	cli: {
		entitiesDir: 'src/entities',
		migrationsDir: 'src/migration',
		subscribersDir: 'src/subscriber'
	},
	subscribers: ['dist/subscriber/**/*.js'],
	migrations: ['dist/migration/**/*.js']
};

export default typeOrmConfig;
