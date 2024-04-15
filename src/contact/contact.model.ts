import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('contact')
export class ContactModel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column('text')
    message: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
