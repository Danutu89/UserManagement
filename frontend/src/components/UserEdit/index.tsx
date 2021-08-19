import React, { memo } from "react";
import { Form, Button } from "react-bootstrap";
import { Person, PersonUpdate } from "../../pages/Home/state";
import GroupSelect from "../GroupSelect";
import { isEqual } from "lodash";

interface UserAddProps {
	handleUserEdit: (arg0: PersonUpdate) => void;
	data: Person;
}

const UserEdit: React.FC<UserAddProps> = ({ handleUserEdit, data }) => {
	const { useState } = React;

	const [user, setUser] = useState({ id: data.id } as PersonUpdate);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setUser((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleGroupChange = (id: number) => {
		setUser((prevState) => ({
			...prevState,
			group: id,
		}));
	};

	return (
		<Form>
			<Form.Group className="mb-3" controlId="addUser">
				<Form.Label>Edit User</Form.Label>
				<Form.Control
					type="text"
					placeholder="First Name"
					onChange={handleInputChange}
					defaultValue={data.first_name}
					name="first_name"
				/>
				<Form.Control
					type="text"
					placeholder="Last Name"
					defaultValue={data.last_name}
					onChange={handleInputChange}
					name="last_name"
				/>
				<Form.Control
					type="text"
					placeholder="Job Title"
					defaultValue={data.job_title}
					onChange={handleInputChange}
					name="job_title"
				/>
				<GroupSelect
					handleSubmit={handleGroupChange}
					defaultValue={data.group?.id}
				/>
			</Form.Group>

			<Button variant="primary" onClick={() => handleUserEdit(user)}>
				Submit
			</Button>
		</Form>
	);
};

export default memo(UserEdit, isEqual);
