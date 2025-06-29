import { Router } from "express";
import { BaseController } from "../controllers/common/base";
import auth from "../middleware/auth";

export const genericRoutes = <T>(controller: BaseController<T>) => {
    const router = Router();

    router.post("/", auth, controller.create);
    router.get("/", auth, controller.getAll);
    router.get("/:id", auth, controller.getById);
    router.put("/:id", auth, controller.updateById);
    router.delete("/:id", auth, controller.deleteById)

    return router
}
