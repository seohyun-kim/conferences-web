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

  @Column({ nullable: true })
  url?: string;

  @Column({ nullable: true })
  rank?: string; // 예: 'A', 'B', 'C', 'top', 'second tier'

  @Column({ nullable: true })
  category?: string; // 예: 'System', 'AI'

  @Column('text', { nullable: true })
  memo?: string; // 긴 텍스트
}
