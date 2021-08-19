import { createSlice } from "@reduxjs/toolkit";
import {
	deleteGroupAsync,
	deletePersonAsync,
	getGroupAsync,
	getGroupsAsync,
	getPersonListAsync,
	postGroupAsync,
	postPersonAsync,
	putGroupAsync,
	putPersonAsync,
} from "./thunks";
import { Group, initialState } from "./state";

export const homeSlice = createSlice({
	name: "home",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getGroupAsync.pending, (state) => {
				state.group.status = "loading";
			})
			.addCase(getGroupAsync.fulfilled, (state, action) => {
				state.group.status = "completed";
				state.group.data = action.payload;
			})
			.addCase(getGroupAsync.rejected, (state, action) => {
				state.group.status = "failed";
				state.group.error = action.error.message || "Error";
			})
			.addCase(deleteGroupAsync.pending, (state) => {
				state.groups.status = "loading";
			})
			.addCase(deleteGroupAsync.fulfilled, (state, action) => {
				state.groups.status = "completed";
				state.groups.data = action.payload.list;
				if (state.group.data.id === action.payload.id) {
					state.group.status = "idle";
					state.group.data = {} as Group;
				}
			})
			.addCase(deleteGroupAsync.rejected, (state, action) => {
				state.groups.status = "failed";
				state.groups.error = action.error.message || "Error";
			})
			.addCase(getGroupsAsync.pending, (state) => {
				state.groups.status = "loading";
			})
			.addCase(getGroupsAsync.fulfilled, (state, action) => {
				state.groups.status = "completed";
				state.groups.data = action.payload;
			})
			.addCase(getGroupsAsync.rejected, (state, action) => {
				state.groups.status = "failed";
				state.groups.error = action.error.message || "Error";
			})
			.addCase(postGroupAsync.pending, (state) => {
				state.group.status = "loading";
			})
			.addCase(postGroupAsync.fulfilled, (state, action) => {
				state.group.status = "completed";
				state.group.data = action.payload.single;
				state.groups.data = action.payload.list;
			})
			.addCase(postGroupAsync.rejected, (state, action) => {
				state.group.status = "failed";
				state.group.error = action.error.message || "Error";
			})
			.addCase(putGroupAsync.pending, (state) => {
				state.groups.status = "loading";
			})
			.addCase(putGroupAsync.fulfilled, (state, action) => {
				state.groups.status = "completed";
				state.groups.data = action.payload;
			})
			.addCase(putGroupAsync.rejected, (state, action) => {
				state.group.status = "failed";
				state.group.error = action.error.message || "Error";
			})
			.addCase(getPersonListAsync.pending, (state) => {
				state.users.status = "loading";
			})
			.addCase(getPersonListAsync.fulfilled, (state, action) => {
				state.users.status = "completed";
				state.users.data = action.payload;
			})
			.addCase(getPersonListAsync.rejected, (state, action) => {
				state.users.status = "failed";
				state.users.error = action.error.message || "Error";
			})
			.addCase(postPersonAsync.pending, (state) => {
				state.users.status = "loading";
			})
			.addCase(postPersonAsync.fulfilled, (state, action) => {
				state.users.data = [...action.payload];
				state.users.status = "completed";
			})
			.addCase(postPersonAsync.rejected, (state, action) => {
				state.users.status = "failed";
				state.users.error = action.error.message || "Error";
			})
			.addCase(deletePersonAsync.pending, (state) => {
				state.users.status = "loading";
			})
			.addCase(deletePersonAsync.fulfilled, (state, action) => {
				state.users.status = "completed";
				state.users.data = action.payload;
			})
			.addCase(deletePersonAsync.rejected, (state, action) => {
				state.groups.status = "failed";
				state.groups.error = action.error.message || "Error";
			})
			.addCase(putPersonAsync.pending, (state) => {
				state.users.status = "loading";
			})
			.addCase(putPersonAsync.fulfilled, (state, action) => {
				state.users.status = "completed";
				state.users.data = action.payload;
			})
			.addCase(putPersonAsync.rejected, (state, action) => {
				state.users.status = "failed";
				state.users.error = action.error.message || "Error";
			});
	},
});

export default homeSlice.reducer;
