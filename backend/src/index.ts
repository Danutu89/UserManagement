import 'reflect-metadata';

import { createConnection } from 'typeorm';
import { Request, Response } from 'express';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { AppRoutes } from './routes';
import typeOrmConfig from './config';

const start = async () => {
	try {
		await createConnection(typeOrmConfig);
	} catch (error) {
		console.log('TypeORM connection error: ', error);
		return;
	}

	const app = express();
	app.use(bodyParser.json());

	AppRoutes.forEach((route) => {
		app[route.method](route.path, (request: Request, response: Response, next: Function) => {
			route
				.action(request, response)
				.then(() => next)
				.catch((err) => next(err));
		});
	});

	app.listen(process.env.PORT || 5000);

	console.log(`Express application is up and running on port ${process.env.PORT || 5000}`);
};

start();
