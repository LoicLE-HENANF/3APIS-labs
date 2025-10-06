import userModel, {User} from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import {BadRequest, NotFound, Unauthorized} from '../utils/errors.js';
import {signJwt} from '../utils/jwt.js';
import {Service} from "./service.js";

class UserService extends Service<User, string>{
  private model = userModel;

  async register(username: string, password: string): Promise<Omit<User,'passwordHash'>> {
    if (!username || !password) throw new BadRequest('Username / password requis');
    const exists = await this.model.getByUsername(username);
    if (exists) throw new BadRequest('Username déjà utilisé');
    const hash = await bcrypt.hash(password, 10);
    // Premier utilisateur -> ADMIN
    const roles = (await this.model.getAll()).length === 0 ? ['USER','ADMIN'] : ['USER'];
    const user = new User(Date.now().toString(), username, hash, roles);
    await this.model.add(user);
    return user;
  }

  async login(username: string, password: string): Promise<{token: string}> {
    const user = await this.model.getByUsername(username);
    if (!user) throw new Unauthorized('Identifiants invalides');
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) throw new Unauthorized('Identifiants invalides');
    const token = signJwt({
      sub: user.id,
      username: user.username,
      roles: user.roles
    });
    return { token };
  }

  async getAll(): Promise<any[]> {
    return await this.model.getAll();
  }

  async getById(id: string): Promise<User> {
    const u = await this.model.getById(id);
    if (!u) throw new NotFound('Utilisateur introuvable');
    return u;
  }
  
  async add(data: Omit<User, "id">): Promise<User> {
    return this.model.add(data);
  }
  
  async update(id: string, patch: Partial<User>): Promise<User> {
      return this.model.update(id, patch);
  }
    
    async delete(id: string): Promise<User> {
        return this.model.delete(id);
    }
}

export default new UserService();