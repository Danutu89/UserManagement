import React, { memo } from "react";
import styles from "./styles.module.scss";
import { Container, Card, Spinner, Form, Button, Badge } from "react-bootstrap";
import GroupUserList from "../UserList";
import {
	Group,
	GroupUpdate,
	selectGroups,
	selectUsers,
} from "../../pages/Home/state";
import { useAppSelector } from "../../app/hooks";
import { isEqual } from "lodash";
import GroupSelect from "../GroupSelect";
import UserSelect from "../UserSelect";
import GroupList from "../GroupList";

interface GroupDetailsProps {
	data: Group;
	status: "loading" | "failed" | "completed" | "idle";
	error: string;
	handleSubmit: (arg0: number, arg1: GroupUpdate) => void;
}

const GroupDetails: React.FC<GroupDetailsProps> = (props) => {
	const { useState, useEffect } = React;

	const { data, status, error, handleSubmit } = props;

	const groups = useAppSelector(selectGroups);
	const users = useAppSelector(selectUsers);

	const [userId, setUserId] = useState(-1);
	const [group, setGroup] = useState({} as GroupUpdate);

	const handleSelectUser = (id: number) => {
		setUserId(id);
	};

	const handleSelectGroup = (id: number) => {
		setGroup((prevState) => ({ ...prevState, parent_group: id }));
	};

	const handleGroupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setGroup((prevState) => ({ ...prevState, [name]: value }));
	};

	useEffect(() => {
		setUserId(-1);
		if (status === "completed")
			setGroup({
				id: data.id,
				name: data.name,
				parent_group: data.parent_group?.id || null,
			} as GroupUpdate);
	}, [status]);

	return (
		<Container>
			{status === "loading" && <Spinner animation="border" />}
			{status === "failed" && <span>{error}</span>}
			{status === "idle" && <span>Select a group</span>}
			{status === "completed" && (
				<Card>
					<Card.Header>{data.name}</Card.Header>
					<Card.Body>
						<GroupUserList group_id={data.id} />
						{data.sub_groups?.length > 0 && (
							<GroupList data={data.sub_groups} status="completed" error="" />
						)}
					</Card.Body>
					{data.parent_group && (
						<span className={styles.select}>
							Parent Group:{" "}
							<Badge bg="secondary">{data.parent_group.name}</Badge>
						</span>
					)}

					{groups.status === "completed" && users.status === "completed" && (
						<Form className={styles.select}>
							<UserSelect
								label="Add User"
								users={data.users}
								handleSubmit={handleSelectUser}
							/>
							<GroupSelect
								label="Select Parent Group"
								group_id={data.id}
								handleSubmit={handleSelectGroup}
								defaultValue={data.parent_group?.id}
							/>
							<Form.Group className="mb-3" controlId="addGroup">
								<Form.Label>Name</Form.Label>
								<Form.Control
									type="text"
									placeholder="Name"
									onChange={handleGroupChange}
									defaultValue={data.name}
									name="name"
								/>
							</Form.Group>
							<Button
								variant="primary"
								style={{ marginTop: "1rem" }}
								onClick={() => handleSubmit(userId, group)}
							>
								Submit
							</Button>
						</Form>
					)}
					<span className={styles.date}>Created on: {data.created_on}</span>
					<span className={styles.date}> Updated on: {data.updated_on}</span>
				</Card>
			)}
		</Container>
	);
};

export default memo(GroupDetails, isEqual);
