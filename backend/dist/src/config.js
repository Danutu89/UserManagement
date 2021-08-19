"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeOrmConfig = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '',
    database: 'nestor',
    synchronize: true,
    logging: false,
    entities: ['dist/entities/**/*.js'],
    cli: {
        entitiesDir: 'src/entities',
        migrationsDir: 'src/migration',
        subscribersDir: 'src/subscriber'
    },
    subscribers: ['dist/subscriber/**/*.js'],
    migrations: ['dist/migration/**/*.js']
};
exports.default = typeOrmConfig;
//# sourceMappingURL=config.js.map