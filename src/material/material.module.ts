import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MaterialSchema } from 'src/models/material.model';
import { TaskModule } from 'src/task/task.module';
import { MaterialController } from './material.controller';
import { MaterialService } from './material.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Material', schema: MaterialSchema }
    ]),
    forwardRef(() => TaskModule),
  ],
  controllers: [MaterialController],
  providers: [MaterialService],
  exports: [MaterialService]
})
export class MaterialModule {}
