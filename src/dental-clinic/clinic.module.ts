import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ClinicController } from "./clinic.controller";
import { ClinicService } from "./clinic.service";
import PatientEntity from "./entities/patient.entity";

@Module({
    imports:[TypeOrmModule.forFeature([PatientEntity])],
    controllers:[ClinicController],
    providers:[ClinicService],
})
export class ClinicModule{}