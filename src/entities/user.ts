import { Entity, Column } from 'typeorm';
import { Exclude } from 'class-transformer';
import { encrypt } from '../utils';
import BaseEntity from './base-entity';

@Entity()
export default class User extends BaseEntity {
    @Column({ name: 'first_name' })
    firstName!: string;

    @Column({ name: 'last_name', nullable: true })
    lastName!: string;

    @Column({ name: 'email_address', unique: true })
    emailAddress!: string;

    @Exclude({ toPlainOnly: true })
    @Column({ name: 'encrypted_password' })
    private encryptedPassword!: string;

    get password(): string {
        return this.encryptedPassword;
    }

    set password(plainPassword: string) {
        this.encryptedPassword = encrypt(plainPassword);
    }
}
