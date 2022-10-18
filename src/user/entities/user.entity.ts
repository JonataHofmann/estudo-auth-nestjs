import {
  AfterLoad,
  BeforeInsert,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Exclude } from 'class-transformer';

@Entity()
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Exclude()
  oldPassword: string;

  @AfterLoad()
  loadPassword() {
    this.oldPassword = this.password;
  }

  @BeforeInsert()
  hashPassword() {
    if (this.oldPassword !== this.password) {
      this.password = bcrypt.hashSync(this.password, 8);
    }
  }

  public checkIfUnencryptedPasswordIsValid(
    unencryptedPassword: string,
  ): boolean {
    // return this.password === unencryptedPassword;
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}

export default User;
