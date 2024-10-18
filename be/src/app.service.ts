import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DataDao } from './data.dao';

@Injectable()
export class AppService {

  constructor(
    private readonly dataDao: DataDao
  ){}


  async getAll() {
    return [{_id: '1', userName: 'TestUser', content: '123'}]

    //return await this.dataDao.getAll()
  }
}
