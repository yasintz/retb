import { Entity, Column, PrimaryColumn, BaseEntity } from 'typeorm';

@Entity({
  name: 'user',
})
class UserModel extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;
}

export default UserModel;
