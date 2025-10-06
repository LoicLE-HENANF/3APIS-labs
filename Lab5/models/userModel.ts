import {NotFound} from "../utils/errors.js";

export class User {
  public id: string;
  public username: string;
  public passwordHash: string;
  public roles: string[];

  constructor(id: string, username: string, passwordHash: string, roles: string[] = ['USER']) {
    this.id = id;
    this.username = username;
    this.passwordHash = passwordHash;
    this.roles = roles;
  }
}

export class UserModel {
  private users: User[] = [];

  async getAll(): Promise<User[]> {
    return this.users;
  }

  async getById(id: string): Promise<User | undefined> {
    return this.users.find(u => u.id === id);
  }

  async getByUsername(username: string): Promise<User | undefined> {
    return this.users.find(u => u.username === username);
  }

  async add(user: Omit<User, "id">): Promise<User> {
    const newUser = new User(
      Date.now().toString(),
      user.username,
      user.passwordHash,
      user.roles
    );
    this.users.push(newUser);
    return newUser;
  }

  update(id: string, patch: Partial<User>): User | PromiseLike<User> {
    const idx = this.users.findIndex(u => u.id === id);
    if (idx === -1) throw new NotFound('User not found');
    const current = this.users[idx];
    if (!current) throw new NotFound('User not found');
    const updated = new User(
      current.id,
      patch.username ?? current.username,
      patch.passwordHash ?? current.passwordHash,
      patch.roles ?? current.roles
    );
    this.users[idx] = updated;
    return updated;
  }
  
    delete(id: string): User | PromiseLike<User> {
        const idx = this.users.findIndex(u => u.id === id);
        if (idx === -1) throw new NotFound('User not found');
        const user = this.users[idx];
        if (!user) throw new NotFound('User not found');
        this.users.splice(idx, 1);
        return user;
    }
}

const userModel = new UserModel();
export default userModel;