import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Data } from "./data.db";



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
        return await this.dataModel.create(data);
    }

    async delete(id: string) {
        return await this.dataModel.deleteOne({_id: id})
    }

    async update(data: Data) {
        return await this.dataModel.updateOne({_id: data}, data)
    }
}