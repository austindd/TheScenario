import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DataDao } from './data.dao';
import { Data, DataDocument } from 'src/data.db';
import { DataDto } from 'src/data.dto';
import { Model } from 'mongoose';

@Injectable()
export class AppService {

  constructor(
    private readonly dataDao: DataDao,
    @InjectModel(Data.name, 'local') private dataModel: Model<DataDocument>
  ){}


  async getAll() {
    return await this.dataDao.getAll()
  }

  async create(data: DataDto) {
    const newData = new this.dataModel(data);
    return await this.dataDao.create(newData)
  }
}
