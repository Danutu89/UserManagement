import { Request, Response } from 'express';
import { getManager } from 'typeorm';
import { Group } from '../entities/Group';

export async function groupPutAction(request: Request, response: Response) {
	const groupRepository = getManager().getRepository(Group);

	const data = request.body as Group;

	if (!data.name) {
		response.status(400).send({
			message: 'Name is required'
		});
		return;
	}

	data.created_on = new Date();
	data.updated_on = new Date();

	const new_person = groupRepository.create(data);

	await groupRepository.save(new_person);

	response.send(new_person);
}

export async function groupPostAction(request: Request, response: Response) {
	const groupRepository = getManager().getRepository(Group);

	const data = request.body;

	const group = await groupRepository.findOne(request.params.id);

	if (!group) {
		response.status(404);
		response.end();
		return;
	}

	group.updated_on = new Date();

	await groupRepository.save({ ...group, ...data });

	const updated_group = await groupRepository.findOne(request.params.id, {
		relations: ['users', 'sub_groups', 'parent_group']
	});

	response.send(updated_group);
}

export async function groupGetByIdAction(request: Request, response: Response) {
	const groupRepository = getManager().getRepository(Group);

	const result = await groupRepository.findOne(request.params.id, {
		relations: ['users', 'sub_groups', 'parent_group']
	});

	if (!result) {
		response.status(404);
		response.end();
		return;
	}

	response.send(result);
}

export async function groupGetAllAction(request: Request, response: Response) {
	const groupRepository = getManager().getRepository(Group);

	const results = await groupRepository.find({
		relations: ['users', 'sub_groups', 'parent_group']
	});

	response.send(results);
}

export async function groupDeleteAction(request: Request, response: Response) {
	const groupRepository = getManager().getRepository(Group);

	try {
		await groupRepository.delete(request.params.id);
		response.send({
			result: request.params.id
		});
	} catch (error) {
		response.status(500).send({
			details: error.detail
		});
	}
}
