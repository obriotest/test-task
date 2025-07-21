import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { bands, bandsDocument } from './bands.schema';

@Injectable()
export class bandsRepository {
  constructor(@InjectModel(bands.name) private bandsModel: Model<bandsDocument>) {}

  async create(createBeerDto): Promise<bands> {
    const createdBeer = new this.bandsModel(createBeerDto);
    return createdBeer.save();
  }

  async findAll(): Promise<bands[]> {
    return this.bandsModel.find().exec();
  }

  async delete(id: string) {
    return this.bandsModel.deleteOne({ _id: id });
  }
}
