import {
	groupDeleteAction,
	groupGetAllAction,
	groupGetByIdAction,
	groupPostAction,
	groupPutAction
} from './controllers/Group';
import {
	personDeleteAction,
	personGetAllAction,
	personGetByIdAction,
	personPostAction,
	personPutAction
} from './controllers/Person';

/**
 * All application routes.
 */
export const AppRoutes = [
	{
		path: '/api/person/list',
		method: 'get',
		action: personGetAllAction
	},
	{
		path: '/api/person/:id',
		method: 'get',
		action: personGetByIdAction
	},
	{
		path: '/api/person/:id/',
		method: 'post',
		action: personPostAction
	},
	{
		path: '/api/person/:id/',
		method: 'delete',
		action: personDeleteAction
	},
	{
		path: '/api/person/',
		method: 'put',
		action: personPutAction
	},
	{
		path: '/api/group/list',
		method: 'get',
		action: groupGetAllAction
	},
	{
		path: '/api/group/:id',
		method: 'get',
		action: groupGetByIdAction
	},
	{
		path: '/api/group/:id/',
		method: 'post',
		action: groupPostAction
	},
	{
		path: '/api/group/:id/',
		method: 'delete',
		action: groupDeleteAction
	},
	{
		path: '/api/group/',
		method: 'put',
		action: groupPutAction
	}
];
