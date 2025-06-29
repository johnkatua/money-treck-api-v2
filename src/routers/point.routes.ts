import { PointController } from "../controllers/point";
import { genericRoutes } from "./generic.routes";

const controller = new PointController();

const challengeRoutes = genericRoutes(controller);

export default challengeRoutes;