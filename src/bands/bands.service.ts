import { Injectable } from '@nestjs/common';
import { CreateBeerDto } from './bands.dto';
import { bandsRepository } from './bands.repository';

@Injectable()
export class bandsService {
  constructor(private readonly bandsRepository: bandsRepository) {}

  async create(createBeerDto: CreateBeerDto) {
    return this.bandsRepository.create(createBeerDto);
  }

  async findAll() {
    return this.bandsRepository.findAll();
  }

  async delete(id: string) {
    return this.bandsRepository.delete(id);
  }
}
