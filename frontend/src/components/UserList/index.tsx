import React, { memo } from "react";
import styles from "./styles.module.scss";
import { Container, ListGroup, Spinner, Button, Badge } from "react-bootstrap";
import { Person, PersonAdd, selectUsers } from "../../pages/Home/state";
import { isEqual } from "lodash";
import { useAppSelector } from "../../app/hooks";
import { UserAdd } from "../UserAdd";

interface UserListProps {
	group_id?: number;
	handleUserRemove?: (arg0: number) => void;
	handleUserAdd?: (arg0: PersonAdd) => void;
	handleUserClick?: (arg0: Person) => void;
	showGroup?: boolean;
}

const UserList: React.FC<UserListProps> = ({
	group_id,
	handleUserRemove,
	handleUserAdd,
	handleUserClick,
	showGroup,
}) => {
	const { data, status, error } = useAppSelector(selectUsers);
	return (
		<Container>
			{handleUserAdd && <UserAdd handleUserAdd={handleUserAdd} />}
			<h5 style={{ marginTop: "1rem" }}>Users</h5>
			<ListGroup style={{ marginTop: "1rem" }}>
				{status === "loading" && <Spinner animation="border" />}
				{status === "failed" && <span>{error}</span>}
				{status === "completed" && (
					<>
						{data
							.filter(
								(user) => (user.group?.id === group_id && group_id) || !group_id
							)
							.map((user) => (
								<ListGroup.Item
									key={user.id}
									style={{ display: "flex", flexFlow: "row" }}
								>
									<span
										className={styles.user}
										onClick={() => {
											if (handleUserClick) handleUserClick(user);
										}}
									>
										{user.first_name} {user.last_name}
										{showGroup && (
											<Badge bg="primary">{user?.group?.name || "None"}</Badge>
										)}
									</span>

									{handleUserRemove && (
										<Button
											variant="danger"
											style={{ marginInlineStart: "auto" }}
											onClick={() => {
												handleUserRemove(user.id);
											}}
										>
											Remove
										</Button>
									)}
								</ListGroup.Item>
							))}
					</>
				)}
			</ListGroup>
		</Container>
	);
};

export default memo(UserList, isEqual);
