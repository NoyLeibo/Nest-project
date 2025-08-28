import { Injectable, NotFoundException } from '@nestjs/common';
export interface User {
  id: number;
  name: string;
  email: string;
}
@Injectable()
export class UsersService {
  private users: User[] = [];
  private nextId = 1;

  create(name: string, email: string): User {
    const user: User = {
      id: this.nextId++,
      name,
      email,
    };
    this.users.push(user);
    return user;
  }

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User {
    const user = this.users.find((u) => u.id === id);
    if (!user) throw new NotFoundException(`User ${id} not found`);
    return user;
  }

  update(id: number, updateData: Partial<User>): User {
    const user = this.findOne(id);
    Object.assign(user, updateData);
    return user;
  }

  remove(id: number): void {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) throw new NotFoundException(`User ${id} not found`);
    this.users.splice(index, 1);
  }
}
