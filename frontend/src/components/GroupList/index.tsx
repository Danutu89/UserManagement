import React, { memo } from "react";
import styles from "./styles.module.scss";
import { Container, ListGroup, Spinner, Button } from "react-bootstrap";
import { Group, GroupAdd as GroupAddInterface } from "../../pages/Home/state";
import { GroupAdd } from "../GroupAdd";
import { isEqual } from "lodash";

interface GroupListProps {
	data: Group[];
	status: "loading" | "failed" | "completed" | "idle";
	error: string;
	handleGroupClick?: (arg0: number) => void;
	handleGroupRemove?: (arg0: number) => void;
	handleGroupAdd?: (arg0: GroupAddInterface) => void;
}

const GroupList: React.FC<GroupListProps> = ({
	data,
	status,
	error,
	handleGroupClick,
	handleGroupRemove,
	handleGroupAdd,
}) => {
	const checkGroupRemovabilty = (id: number): boolean | undefined => {
		if (status !== "completed") return true;
		return data.some((group) => {
			return group.parent_group?.id === id;
		});
	};

	return (
		<Container>
			{handleGroupAdd && <GroupAdd handleGroupAdd={handleGroupAdd} />}
			<h5 style={{ marginTop: "1rem" }}>Groups</h5>
			<ListGroup style={{ marginTop: "1rem" }}>
				{status === "loading" && <Spinner animation="border" />}
				{status === "failed" && <span>{error}</span>}
				{status === "completed" &&
					data.map((group) => (
						<ListGroup.Item
							key={group.id}
							style={{ display: "flex", flexFlow: "row" }}
						>
							<span
								className={styles.group_name}
								onClick={() => {
									if (typeof handleGroupClick === "function")
										handleGroupClick(group.id);
								}}
							>
								{group.name}
							</span>
							{handleGroupRemove && (
								<Button
									variant="danger"
									style={{ marginInlineStart: "auto" }}
									onClick={() => {
										handleGroupRemove(group.id);
									}}
									disabled={checkGroupRemovabilty(group.id)}
								>
									Remove
								</Button>
							)}
						</ListGroup.Item>
					))}
			</ListGroup>
		</Container>
	);
};

export default memo(GroupList, isEqual);
