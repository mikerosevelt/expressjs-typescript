import { Request, Response } from 'express';
import IController from './ControllerInterface';
import TodoService from '../services/TodoService';

class TodoController implements IController {
  index = async (req: Request, res: Response): Promise<Response> => {
    const service: TodoService = new TodoService(req);

    const todos = await service.getAll();

    return res.status(200).json({ success: true, data: todos });
  }

  create = async (req: Request, res: Response): Promise<Response> => {
    const service: TodoService = new TodoService(req);

    const todo = await service.store();

    return res.status(201).json({ success: true, msg: 'Todo created!', data: todo });
  }

  show = async (req: Request, res: Response): Promise<Response> => {
    const service: TodoService = new TodoService(req);

    const todo = await service.getOne();

    if (!todo) {
      return res.status(404).json({ success: false, msg: 'Todo not found!' });
    }

    return res.status(200).json({ success: true, data: todo });
  }

  update = async (req: Request, res: Response): Promise<Response> => {
    const service: TodoService = new TodoService(req);

    const todo = await service.update();

    if (todo == 0) {
      return res.status(404).json({ success: false, msg: 'Todo not found or Failed to update' });
    }

    return res.status(200).json({ success: true, msg: 'Todo updated' });
  }

  delete = async (req: Request, res: Response): Promise<Response> => {
    const service: TodoService = new TodoService(req);

    const todo = await service.delete();

    if (todo == 0) {
      return res.status(404).json({ success: false, msg: 'Todo not found or Failed to delete' });
    }

    return res.status(200).json({ success: true, msg: 'Todo deleted' });
  }
}

export default new TodoController;