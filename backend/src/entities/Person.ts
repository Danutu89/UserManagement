import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { Group } from './Group';

@Entity()
export class Person {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	first_name: string;

	@Column()
	last_name: string;

	@Column()
	job_title: string;

	@Column()
	created_on: Date;

	@Column()
	updated_on: Date;

	@ManyToOne(() => Group, (group) => group.users, { nullable: true, onDelete: 'SET NULL' })
	@JoinColumn()
	group: Group;
}
