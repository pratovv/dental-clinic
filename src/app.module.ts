import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClinicModule } from './dental-clinic/clinic.module';


@Module({
  imports: [TypeOrmModule.forRoot(),ClinicModule],

})
export class AppModule {}
