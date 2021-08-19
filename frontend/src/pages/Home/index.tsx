import React, { memo } from "react";
import GroupList from "../../components/GroupList";
import GroupDetails from "../../components/GroupDetails";
import UserEdit from "../../components/UserEdit";
import { isEqual } from "lodash";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
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
import {
	GroupAdd,
	GroupUpdate,
	Person,
	PersonAdd,
	PersonUpdate,
	selectGroup,
	selectGroups,
} from "./state";
import { Container } from "react-bootstrap";
import styles from "./styles.module.scss";
import GroupUserList from "../../components/UserList";

const Home = () => {
	const dispatch = useAppDispatch();
	const group = useAppSelector(selectGroup);
	const groups = useAppSelector(selectGroups);

	const { useEffect, useState } = React;

	const [user, setPerson] = useState({} as Person);

	useEffect(() => {
		dispatch(getGroupsAsync());
		dispatch(getPersonListAsync());
	}, []);

	const handleGroupClick = (id: number) => {
		dispatch(getGroupAsync(id));
	};

	const handleUserRemove = (id: number) => {
		dispatch(deletePersonAsync(id));
	};

	const handleGroupRemove = (id: number) => {
		dispatch(deleteGroupAsync(id));
	};

	const handleGroupAdd = (group: GroupAdd) => {
		dispatch(putGroupAsync(group));
	};

	const handleUserAdd = (user: PersonAdd) => {
		dispatch(putPersonAsync(user));
	};

	const handleUserClick = (user: Person) => {
		setPerson((prevState) => ({ ...prevState, ...user }));
	};

	const handleUserEdit = (user: PersonUpdate) => {
		console.log(user);

		setPerson({} as Person);
		dispatch(postPersonAsync(user));
	};

	const handleSubmit = (user: number, group_updated: GroupUpdate) => {
		if (user !== -1)
			dispatch(postPersonAsync({ group: group.data.id, id: user }));

		dispatch(postGroupAsync(group_updated));
	};

	return (
		<Container className={styles.main}>
			<GroupList
				{...groups}
				handleGroupClick={handleGroupClick}
				handleGroupRemove={handleGroupRemove}
				handleGroupAdd={handleGroupAdd}
			/>
			<GroupDetails {...group} handleSubmit={handleSubmit} />
			<GroupUserList
				handleUserRemove={handleUserRemove}
				handleUserAdd={handleUserAdd}
				handleUserClick={handleUserClick}
				showGroup
			/>
			{user.id && (
				<UserEdit
					data={{ ...user, id: user.id }}
					handleUserEdit={handleUserEdit}
				/>
			)}
		</Container>
	);
};

export default memo(Home, isEqual);
