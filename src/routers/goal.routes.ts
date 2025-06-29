import { GoalController } from "../controllers/goal.controllers";
import auth from "../middleware/auth";
import { genericRoutes } from "./generic.routes";

const controller = new GoalController();

const goalRoutes = genericRoutes(controller);

goalRoutes.get("/:id/contribute", auth, controller.contributeToGoal);

export default goalRoutes;