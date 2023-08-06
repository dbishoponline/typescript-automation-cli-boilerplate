import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Worklog, WorklogDocument } from './worklog.schema';

@Injectable()
export class WorklogService {
  constructor(
    @InjectModel(Worklog.name) private worklogModel: Model<WorklogDocument>,
  ) { }

  async create(worklog: Worklog): Promise<Worklog> {
    const createdWorklog = new this.worklogModel(worklog);
    return createdWorklog.save();
  }

  async findAll(): Promise<Worklog[]> {
    return this.worklogModel.find().exec();
  }

  async findOne(id: string): Promise<Worklog> {
    return this.worklogModel.findById(id).exec();
  }

  async update(id: string, worklog: Worklog): Promise<Worklog> {
    return this.worklogModel.findByIdAndUpdate(id, worklog, { new: true });
  }

  async delete(id: string): Promise<Worklog> {
    return this.worklogModel.findByIdAndRemove(id);
  }
}
