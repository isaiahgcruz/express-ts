import { Controller, Get } from '@overnightjs/core';
import { Request, Response } from 'express';
import User from '../models/User';

@Controller('api/users')
class UserController {
  private users: Array<User> = [
    { id: 1, name: 'Isaiah' },
    { id: 2, name: 'Cruz' },
    { id: 2, name: 'Test Guy' },
  ];

  @Get()
  private index(req: Request, res: Response): void {
    res.send(this.users);
  }

  @Get(':id')
  private show(req: Request, res: Response): void {
    const user = this.users.find((item) => item.id === Number(req.params.id));

    if (user) {
      res.send(user);
    } else {
      res.status(404).end();
    }
  }
}

export default UserController;
