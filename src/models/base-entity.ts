import {
    PrimaryGeneratedColumn,
    BaseEntity as _BaseEntity,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';

/**
 * A database entity class that defines common properties all tables
 * such as primary-key and timestamps.
 */
export default class BaseEntity extends _BaseEntity {
    @PrimaryGeneratedColumn() id!: number;

    @CreateDateColumn({ name: 'created_at', nullable: true })
    public createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at', nullable: true })
    public updatedAt!: Date;
}
