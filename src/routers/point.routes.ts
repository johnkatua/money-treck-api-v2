import { PointController } from "../controllers/point";
import { genericRoutes } from "./generic.routes";

const controller = new PointController();

const pointRoutes = genericRoutes(controller);

export default pointRoutes;