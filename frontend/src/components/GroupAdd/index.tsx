import React from "react";
import { Form, Button } from "react-bootstrap";
import { GroupAdd as GroupAddInterface } from "../../pages/Home/state";

interface GroupAddProps {
	handleGroupAdd: (arg0: GroupAddInterface) => void;
}

const GroupAdd: React.FC<GroupAddProps> = ({ handleGroupAdd }) => {
	const { useState } = React;

	const [group, setGroup] = useState({} as GroupAddInterface);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setGroup((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	return (
		<Form>
			<Form.Group className="mb-3" controlId="addGroup">
				<Form.Label>Add Group</Form.Label>
				<Form.Control
					type="text"
					placeholder="Name"
					onChange={handleInputChange}
					name="name"
				/>
			</Form.Group>

			<Button variant="primary" onClick={() => handleGroupAdd(group)}>
				Submit
			</Button>
		</Form>
	);
};

export { GroupAdd };
