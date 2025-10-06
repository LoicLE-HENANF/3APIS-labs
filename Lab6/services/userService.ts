import { UserModel, IUser } from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import { BadRequest, NotFound, Unauthorized } from '../utils/errors.js';
import { signJwt } from '../utils/jwt.js';
import { Service } from "./service.js";

class UserService extends Service<IUser> {
  async register(username: string, password: string): Promise<Partial<IUser>> {
    if (!username || !password) throw new BadRequest('Username / password requis');
    const exists = await UserModel.findOne({ username });
    if (exists) throw new BadRequest('Username déjà utilisé');
    const hash = await bcrypt.hash(password, 10);
    const count = await UserModel.countDocuments();
    const roles = count === 0 ? ['USER', 'ADMIN'] : ['USER'];
    const user = await UserModel.create({ username, passwordHash: hash, roles });
    const { passwordHash, ...rest } = user.toObject();
    return rest;
  }

  async login(username: string, password: string): Promise<{ token: string }> {
    const user = await UserModel.findOne({ username });
    if (!user) throw new Unauthorized('Identifiants invalides');
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) throw new Unauthorized('Identifiants invalides');
    
    const token = await signJwt({
      sub: (user._id as string).toString(),
      username: user.username,
      roles: user.roles
    }).catch((err) => {
      console.log(err);
      throw new Unauthorized('Identifiants invalides, erreur: ' + err.message);
    })
    
    return { token };
  }

  async getAll(): Promise<IUser[]> {
    return UserModel.find();
  }

  async getById(id: string): Promise<IUser> {
    const user = await UserModel.findById(id);
    if (!user) throw new NotFound('Utilisateur introuvable');
    return user;
  }

  async add(data: Partial<IUser>): Promise<IUser> {
    return UserModel.create(data);
  }

  async update(id: string, patch: Partial<IUser>): Promise<IUser | null> {
    return UserModel.findByIdAndUpdate(id, patch, { new: true });
  }

  async delete(id: string): Promise<IUser | null> {
    return UserModel.findByIdAndDelete(id);
  }
}

export default new UserService();