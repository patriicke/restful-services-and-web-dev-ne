import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import * as _ from 'lodash';
import { RoleEntity } from '~/modules/roles/model/role.entity';
import { UserEntity } from '~/modules/users/model/user.entity';

const users = [
  {
    firstName: 'Admin',
    lastName: 'User',
    username: 'admin',
    email: 'admin@rca.ac.rw',
    password: 'password@123',
  },
];

const INITITIAL_ROLES = ['admin', 'user'];

export default class CreateUsersSeed implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    // Creating roles
    const roles = INITITIAL_ROLES.map((name) => {
      return new RoleEntity({ name });
    });

    const savedRoles = await connection.manager.save(roles);
    //Creating users
    const entities = await Promise.all(
      users.map(async (u) => {
        const roles = Promise.resolve(savedRoles);
        const user = new UserEntity({ ...u, roles });
        return user;
      }),
    );
    await connection.manager.save(entities);
  }
}
