import { Entity, Column, PrimaryColumn, BaseEntity } from 'typeorm';

@Entity({
  name: 'user',
})
class UserModel extends BaseEntity {
  @PrimaryColumn({ nullable: false })
  id: string;

  @Column({ unique: true, nullable: false })
  username: string;

  @Column({ unique: true, nullable: true })
  googleId: string;

  @Column({ nullable: true })
  password: string;
}

export default UserModel;
