import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToMany, ManyToOne } from 'typeorm';
import { Person } from './Person';

@Entity()
export class Group {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	created_on: Date;

	@Column()
	updated_on: Date;

	@ManyToOne(() => Group, (parent_group) => parent_group.sub_groups)
	@JoinColumn()
	parent_group: Group;

	@OneToMany(() => Group, (sub_group) => sub_group.parent_group, { nullable: true })
	@JoinColumn()
	sub_groups: Group[];

	@OneToMany(() => Person, (person) => person.group)
	@JoinColumn()
	users: Person[];
}
