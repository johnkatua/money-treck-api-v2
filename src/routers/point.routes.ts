import { PointController } from "../controllers/point";
import { genericRoutes } from "./generic.routes";

const controller = new PointController();

const pointRoutes = genericRoutes(controller);

pointRoutes.get("/user/:userId", controller.getAllByUserId)

export default pointRoutes;