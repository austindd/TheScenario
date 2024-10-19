import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Data } from "./data.db";
import { v4 as uuid_v4 } from 'uuid';



@Injectable()
export class DataDao {

    constructor(
        @InjectModel(Data.name, "local")
        private dataModel: Model<Data>,
    ) {

    }
    async get(id: string) {
        return this.dataModel.findById(id);
    }

    async getAll() {
        return this.dataModel.find();
    }

    async create(data: Data) {
        const createdData = await this.dataModel.create(data);
        return createdData;
    }

    async delete(id: string) {
        return await this.dataModel.deleteOne({_id: id})
    }
}