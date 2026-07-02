import { ICommandHandler } from './ICommandHandler';
import { CreateUserCommand } from '../commands/CreateUserCommand';
import { IUserRepository } from '@domain/auth/repositories/UserRepository';

export class CreateUserCommandHandler implements ICommandHandler<CreateUserCommand, void> {
  constructor(private userRepository: IUserRepository) {}

  async handle(command: CreateUserCommand): Promise<void> {
    // Logic for orchestrating user creation via Domain Layer
  }
}
