import Badge from "../models/badge";
import { BadgeService } from "../services/badge.services";
import { BaseController } from "./common/base";

const service = new BadgeService(Badge)

export class BadgeController extends BaseController<any> {
    constructor() {
        super(service)
    }
}