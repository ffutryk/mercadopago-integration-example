import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {
  UserExistsError,
  WrongCredentialsError,
  UnauthorizedError,
} from '../errors/errors.js';
import { TOKEN } from '../config/secrets.js';

export class AuthService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async register(dto) {
    const existingUser = await this.userRepository.findByEmail(dto.email);
    if (existingUser) throw new UserExistsError();

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const newUser = {
      email: dto.email,
      password: hashedPassword,
      name: dto.name,
      surname: dto.surname,
    };

    const savedUser = await this.userRepository.create(newUser);

    const token = jwt.sign({ userId: savedUser.uid }, TOKEN, {
      expiresIn: '7d',
    });

    return {
      user: savedUser,
      token,
    };
  }

  async login(dto) {
    const user = await this.userRepository.findByEmail(dto.email);
    if (!user) throw new WrongCredentialsError();

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) throw new WrongCredentialsError();

    const token = jwt.sign({ userId: user.uid }, TOKEN, { expiresIn: '7d' });

    return {
      token,
      user,
    };
  }

  async validateToken(dto) {
    const { token } = dto;

    if (!token) throw new UnauthorizedError();

    const { userId } = jwt.verify(token, TOKEN);

    if (!userId) throw new UnauthorizedError();

    const user = await this.userRepository.findByUid(userId);

    if (!user) throw new UnauthorizedError();

    return user;
  }
}
