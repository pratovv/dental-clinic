import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { LessThanOrEqual, MoreThanOrEqual,MoreThan, Repository } from "typeorm";
import { PatientDto, UpdatePateintDto } from "./dto/patient.dto";
import PatientEntity from "./entities/patient.entity";

@Injectable()
export class ClinicService {
    constructor(@InjectRepository(PatientEntity) private ClinicRepository: Repository<PatientEntity>) { }

    async findall(): Promise<PatientEntity[]> {
        return await this.ClinicRepository.find()
    }
    async dintist(dentist: string): Promise<PatientEntity[]> {
        const dentists = await this.ClinicRepository.find({ where: { dentistName: dentist } })
        if (!dentists) {
            throw new Error(`There isn't any dentist with name ${dentists}`)
        }
        return dentists
    }

    async create(createPatientDto: PatientDto): Promise<PatientEntity> {
        const dateA = new Date(createPatientDto.date)

        const dateB = dateA.setHours(+1)
        

        const working = await this.ClinicRepository.findOne({
            where: { dateA: MoreThanOrEqual(dateA), dateB: LessThanOrEqual(dateB) }
        })
        if (working) {
            throw new Error(`Please write another time,${dateA}to${dateB}is booked`)
        }
        if(dateA.getDay()<=0||dateA.getDay()>=6){
            throw new Error(`Clinic is not working on weekend`)
        }
        if (dateA.getHours() < 9 || dateA.getHours() > 17) {
            throw new Error(`Clinic is working since 9:00 to 17:00`)
        }
        if (dateA.getHours() >= 12 && dateA.getHours() <= 13) {
            throw new Error(`It's time for dinner`)
        }
        const newPatient = await { ...createPatientDto, DateB: dateB }
        return await this.ClinicRepository.save(newPatient)
    }
    async update(patientId: number, updatePateintDto: UpdatePateintDto): Promise<PatientEntity> {
        const planned = await this.ClinicRepository.findOne(patientId)
        if (!planned) {
            throw new Error(`${planned}is not found`)
        }
        Object.assign(planned, updatePateintDto)
        return await this.ClinicRepository.save(planned)
    }
    async remove(id: number) {
        const working = await this.ClinicRepository.findOne(id)
        if (!working){
        throw new Error(`This ${id}wasn't found`)
        }     
        return await this.ClinicRepository.delete(id)
        }
    async activeList(){
        const dateA=new Date()
        const patients=await this.ClinicRepository.find({where:{dateA:MoreThan(dateA)}})
        return patients
    }

}