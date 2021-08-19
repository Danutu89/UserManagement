import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../app/store";
import {
	Group,
	GroupAdd,
	GroupUpdate,
	Person,
	PersonAdd,
	PersonUpdate,
} from "./state";

export const getGroupsAsync = createAsyncThunk("group/list", async () => {
	const response = await axios.get(`/api/group/list`);

	return response.data;
});

export const getGroupAsync = createAsyncThunk("group", async (id: number) => {
	const response = await axios.get(`/api/group/${id}`);

	return response.data;
});

export const deleteGroupAsync = createAsyncThunk(
	"group/delete",
	async (id: number, api) => {
		await axios.delete(`/api/group/${id}`);

		const {
			home: { groups },
		} = api.getState() as RootState;

		return { list: groups.data.filter((group) => group.id !== id), id };
	}
);

export const putGroupAsync = createAsyncThunk(
	"group/put",
	async (group: GroupAdd, api) => {
		const response = await axios.put(`/api/group`, group);

		const {
			home: { groups },
		} = api.getState() as RootState;

		return [...groups.data, response.data as Group];
	}
);

export const postGroupAsync = createAsyncThunk(
	"group/post",
	async (group: GroupUpdate, api) => {
		const response = await axios.post(`/api/group/${group.id}`, group);

		const {
			home: { groups },
		} = api.getState() as RootState;

		const index = groups.data.findIndex((u) => u.id === group.id);
		const temp = [...groups.data];
		temp[index] = response.data;

		return { single: response.data as Group, list: temp };
	}
);

export const getPersonListAsync = createAsyncThunk("person/list", async () => {
	const response = await axios.get(`/api/person/list`);

	return response.data;
});

export const putPersonAsync = createAsyncThunk(
	"person/put",
	async (person: PersonAdd, api) => {
		const response = await axios.put(`/api/person`, person);

		const {
			home: { users },
		} = api.getState() as RootState;

		return [...users.data, response.data as Person];
	}
);

export const postPersonAsync = createAsyncThunk(
	"person/post",
	async (person: PersonUpdate, api) => {
		const response = await axios.post(`/api/person/${person.id}`, person);

		const {
			home: { users },
		} = api.getState() as RootState;

		const index = users.data.findIndex((u) => u.id === person.id);
		const temp = [...users.data];
		temp[index] = response.data;

		return temp;
	}
);

export const deletePersonAsync = createAsyncThunk(
	"person/delete",
	async (id: number, api) => {
		await axios.delete(`/api/person/${id}`);

		const {
			home: { users },
		} = api.getState() as RootState;

		return users.data.filter((user) => user.id !== id);
	}
);
