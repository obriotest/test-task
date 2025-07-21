import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateBeerDto } from './bands.dto';
import { bandsService } from './bands.service';

@Controller('bands')
export class bandsController {
  constructor(private readonly bandsService: bandsService) {}

  @Get()
  async findAll() {
    return this.bandsService.findAll();
  }

  @Post()
  async create(@Body() createBeerDto: CreateBeerDto) {
    return this.bandsService.create(createBeerDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.bandsService.delete(id);
  }
}
