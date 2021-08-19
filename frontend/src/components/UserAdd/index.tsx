import React from "react";
import { Form, Button } from "react-bootstrap";
import { PersonAdd } from "../../pages/Home/state";
import GroupSelect from "../GroupSelect";

interface UserAddProps {
	handleUserAdd: (arg0: PersonAdd) => void;
}

const UserAdd: React.FC<UserAddProps> = ({ handleUserAdd }) => {
	const { useState } = React;

	const [user, setUser] = useState({} as PersonAdd);

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
				<Form.Label>Add User</Form.Label>
				<Form.Control
					type="text"
					placeholder="First Name"
					onChange={handleInputChange}
					name="first_name"
				/>
				<Form.Control
					type="text"
					placeholder="Last Name"
					onChange={handleInputChange}
					name="last_name"
				/>
				<Form.Control
					type="text"
					placeholder="Job Title"
					onChange={handleInputChange}
					name="job_title"
				/>
				<GroupSelect handleSubmit={handleGroupChange} />
			</Form.Group>

			<Button variant="primary" onClick={() => handleUserAdd(user)}>
				Submit
			</Button>
		</Form>
	);
};

export { UserAdd };
