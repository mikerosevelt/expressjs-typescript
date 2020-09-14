import BaseRoutes from './BaseRoutes';

import AuthController from '../controllers/AuthController';

// middleware
import validate from '../middleware/AuthValidator';
import { auth } from '../middleware/AuthMiddleware';

class AuthRoutes extends BaseRoutes {

  public routes(): void {
    this.router.post("/login", AuthController.login);
    this.router.post("/register", validate, AuthController.register);
    this.router.get("/profile", auth, AuthController.profile);
  }
}
export default new AuthRoutes().router;