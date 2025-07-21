import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { bandsController } from './bands.controller';
import { bandsRepository } from './bands.repository';
import { bands, bandsSchema } from './bands.schema';
import { bandsService } from './bands.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: bands.name, schema: bandsSchema }])],
  controllers: [bandsController],
  providers: [bandsService, bandsRepository],
})
export class bandsModule {}
