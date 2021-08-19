import React, { memo } from "react";
import { Spinner, Form } from "react-bootstrap";
import { Person, selectUsers } from "../../pages/Home/state";
import { useAppSelector } from "../../app/hooks";
import { isEqual } from "lodash";

interface UserSelectProps {
	handleSubmit: (arg0: number) => void;
	label?: string;
	users?: Person[];
}

const UserSelect: React.FC<UserSelectProps> = ({
	handleSubmit,
	label,
	users,
}) => {
	const { data, status, error } = useAppSelector(selectUsers);

	const handleSelectUser = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const { value } = e.target;
		handleSubmit(parseInt(value, 10));
	};

	return (
		<>
			{status === "loading" && <Spinner animation="border" />}
			{status === "failed" && <span>{error}</span>}
			{status === "idle" && <span>Select a group</span>}
			{status === "completed" && (
				<>
					{label && <Form.Label>{label}</Form.Label>}
					<Form.Select aria-label="Select User" onChange={handleSelectUser}>
						<option value="-1">Select Person</option>
						{data
							.filter(
								(user) =>
									(users?.length &&
										!users.map((u) => u.id).includes(user.id)) ||
									!users?.length
							)
							.map((user) => (
								<option key={user.id} value={user.id}>
									{user.first_name} {user.last_name}
								</option>
							))}
					</Form.Select>
				</>
			)}
		</>
	);
};

export default memo(UserSelect, isEqual);
