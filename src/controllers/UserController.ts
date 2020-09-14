import { Request, Response } from 'express';
import IController from './ControllerInterface';

let data: any[] = [
  { id: 1, name: "Meidhy" },
  { id: 2, name: "Mei" },
  { id: 3, name: "dhy" },
  { id: 4, name: "Kris" },
];
class UserController implements IController {

  index(req: Request, res: Response): Response {
    return res.send(data);
  }

  create(req: Request, res: Response): Response {
    const { id, name } = req.body;

    data.push({ id, name });

    return res.send('Success create');
  }

  show(req: Request, res: Response): Response {
    const id = req.params.id;

    let person = data.find(item => item.id == id);
    return res.send(person);
  }

  update(req: Request, res: Response): Response {
    const id = req.params.id;
    const name = req.body.name;

    let person = data.find(item => item.id == id);
    person.name = name;

    return res.send("Success update");
  }

  delete(req: Request, res: Response): Response {
    const id = req.params.id;

    let people = data.filter(item => item.id != id);

    return res.send(people);
  }
}

export default new UserController;