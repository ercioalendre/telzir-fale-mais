import { EntityRepository, Repository } from "typeorm";
import User from "@modules/users/typeorm/entities/User.entity";

@EntityRepository(User)
class UsersRepository extends Repository<User> {
  public async findByPhone(phone: string): Promise<User | undefined> {
    const user = await this.findOne({
      where: {
        phone,
      },
    });
    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.findOne({
      where: {
        email,
      },
    });
    return user;
  }
}

export default UsersRepository;
