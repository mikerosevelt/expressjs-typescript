import BaseRoutes from './BaseRoutes';

import TodoController from '../controllers/TodoController';

// middleware
import validate from '../middleware/TodoValidator';
import { auth } from '../middleware/AuthMiddleware';

class TodoRoutes extends BaseRoutes {

  public routes(): void {
    this.router.route("/")
      .get(auth, TodoController.index)
      .post(auth, validate, TodoController.create);
    this.router.route("/:id")
      .get(auth, TodoController.show)
      .put(auth, validate, TodoController.update)
      .delete(auth, TodoController.delete);
  }
}
export default new TodoRoutes().router;