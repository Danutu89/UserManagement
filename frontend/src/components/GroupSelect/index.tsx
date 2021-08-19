import React, { memo } from "react";
import { Spinner, Form } from "react-bootstrap";
import { selectGroups } from "../../pages/Home/state";
import { useAppSelector } from "../../app/hooks";
import { isEqual } from "lodash";

interface GroupSelectProps {
	handleSubmit: (arg0: number) => void;
	label?: string;
	group_id?: number;
	defaultValue?: number;
}

const GroupSelect: React.FC<GroupSelectProps> = ({
	handleSubmit,
	label,
	group_id,
	defaultValue,
}) => {
	const { data, status, error } = useAppSelector(selectGroups);

	const handleSelectGroup = (e: React.ChangeEvent<HTMLSelectElement>) => {
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
					<Form.Select
						aria-label="Select Parent Group"
						onChange={handleSelectGroup}
						defaultValue={defaultValue}
					>
						<option value="null">Select Group</option>
						{data
							.filter(
								(group) => (group_id !== group.id && group_id) || !group_id
							)
							.map((group) => (
								<option key={group.id} value={group.id}>
									{group.name}
								</option>
							))}
					</Form.Select>
				</>
			)}
		</>
	);
};

export default memo(GroupSelect, isEqual);
