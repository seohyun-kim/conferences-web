import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Conference {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name?: string;

  @Column('datetime')
  abstract_due?: Date;

  @Column('datetime')
  full_paper_due?: Date;

  @Column()
  location?: string;

  @Column('datetime', { nullable: true })
  conference_start?: Date;

  @Column('datetime', { nullable: true })
  conference_end?: Date;
}
