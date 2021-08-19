import { Request, Response } from 'express';
import { getManager } from 'typeorm';
import { Person } from '../entities/Person';

export async function personPutAction(request: Request, response: Response) {
	const personRepository = getManager().getRepository(Person);

	const data = request.body as Person;

	if (!data.first_name) {
		response.status(400).send({
			message: 'First Name is required'
		});
		return;
	}
	if (!data.last_name) {
		response.status(400).send({
			message: 'Last Name is required'
		});
		return;
	}
	if (!data.job_title) {
		response.status(400).send({
			message: 'Job Title is required'
		});
		return;
	}
	if (!data.group) {
		response.status(400).send({
			message: 'Group is required'
		});
		return;
	}

	data.created_on = new Date();
	data.updated_on = new Date();

	const body_person = await personRepository.create(request.body);

	const new_person = await personRepository.save(body_person);

	const person = await personRepository.findOne(new_person['id'], { relations: ['group'] });

	response.send(person);
}

export async function personPostAction(request: Request, response: Response) {
	const personRepository = getManager().getRepository(Person);

	const data = request.body;

	const person = await personRepository.findOne(request.params.id);

	if (!person) {
		response.status(404);
		response.end();
		return;
	}

	data.updated_on = new Date();

	await personRepository.save({ ...person, ...data });

	const updated_person = await personRepository.findOne(request.params.id, {
		relations: ['group']
	});

	response.send(updated_person);
}

export async function personGetByIdAction(request: Request, response: Response) {
	const personRepository = getManager().getRepository(Person);

	const result = await personRepository.findOne(request.params.id);

	if (!result) {
		response.status(404);
		response.end();
		return;
	}

	response.send(result);
}

export async function personGetAllAction(request: Request, response: Response) {
	const personRepository = getManager().getRepository(Person);

	const results = await personRepository.find({ relations: ['group'] });

	response.send(results);
}

export async function personDeleteAction(request: Request, response: Response) {
	const personRepository = getManager().getRepository(Person);

	try {
		await personRepository.delete(request.params.id);
		response.send({
			result: request.params.id
		});
	} catch (error) {
		response.status(500).send({
			details: error.detail
		});
	}
}
