import { RootState } from "../../app/store";

export interface GroupMini {
	name: string;
	id: number;
}

export interface Person {
	first_name: string;
	last_name: string;
	job_title: string;
	group: GroupMini;
	id: number;
	created_on: string;
	updated_on: string;
}

export interface PersonUpdate {
	first_name?: string;
	last_name?: string;
	job_title?: string;
	group?: number;
	id: number;
}

export interface PersonAdd {
	first_name: string;
	last_name: string;
	job_title: string;
	group: number;
}

export interface Group {
	name: string;
	id: number;
	users: Person[];
	parent_group: Group;
	sub_groups: Group[];
	created_on: string;
	updated_on: string;
}

export interface GroupUpdate {
	name?: string;
	id: number;
	parent_group?: number;
}

export interface GroupAdd {
	name: string;
	parent_group: number;
}

export interface HomePageState {
	groups: {
		data: Group[];
		status: "idle" | "completed" | "loading" | "failed";
		error: string;
	};
	group: {
		data: Group;
		status: "idle" | "completed" | "loading" | "failed";
		error: string;
	};
	users: {
		data: Person[];
		status: "idle" | "completed" | "loading" | "failed";
		error: string;
	};
}
export const initialState: HomePageState = {
	groups: {
		data: [],
		status: "idle",
		error: "",
	},
	group: {
		data: {} as Group,
		status: "idle",
		error: "",
	},
	users: {
		data: [],
		status: "idle",
		error: "",
	},
};

export const selectGroup = (state: RootState) => state.home.group;
export const selectGroups = (state: RootState) => state.home.groups;
export const selectUsers = (state: RootState) => state.home.users;
