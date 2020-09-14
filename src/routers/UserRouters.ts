import BaseRoutes from './BaseRoutes';
import { auth } from '../middleware/AuthMiddleware';

import UserController from '../controllers/UserController';

class UserRoutes extends BaseRoutes {
  public routes(): void {
    this.router.route("/")
      .get(auth, UserController.index)
      .post(UserController.create);

    this.router.route("/:id")
      .get(UserController.show)
      .put(UserController.update)
      .delete(UserController.delete);
  }
}
export default new UserRoutes().router;