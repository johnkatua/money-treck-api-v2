import { Model } from "mongoose";
import { IBadge } from "../interface/badge";
import { GenericService } from "./generic";

export class BadgeService extends GenericService<IBadge> {
    constructor (model: Model<IBadge>) {
        super(model)
    }
}