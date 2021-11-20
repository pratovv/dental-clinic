import { Injectable,HttpException,HttpStatus } from "@nestjs/common";
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
        const dateA = new Date(createPatientDto.dateA)
        const dateB = new Date(createPatientDto.dateA)
        dateB.setHours(dateB.getHours()+1)
        console.log(dateA,dateB)
        const working = await this.ClinicRepository.findOne({
            where: { dateA: MoreThanOrEqual(dateA), dateB: LessThanOrEqual(dateB) }
        })
        if (working) {
            throw new HttpException(`Please write another time,${dateA}to${dateB}is booked`,HttpStatus.BAD_REQUEST)
        }
        if(dateA.getDay()<=0||dateA.getDay()>=6){
            throw new HttpException(`Clinic is not working on weekend`,HttpStatus.BAD_REQUEST)
        }
        if (dateA.getHours() < 9 || dateA.getHours() > 17) {
            throw new HttpException(`Clinic is working since 9:00 to 17:00`,HttpStatus.BAD_REQUEST)
        }
        if (dateA.getHours() >= 12 && dateA.getHours() <= 13) {
            throw new HttpException(`It's time for dinner`,HttpStatus.BAD_REQUEST)
        }
        const newPatient = { ...createPatientDto, dateB: dateB }
        return await this.ClinicRepository.save(newPatient)
    }
    async update(patientId: number, updatePateintDto: UpdatePateintDto): Promise<PatientEntity> {
        const planned = await this.ClinicRepository.findOne(patientId)
        if (!planned) {
            throw new HttpException(`${planned}is not found`,HttpStatus.BAD_REQUEST)
        }
        Object.assign(planned, updatePateintDto)
        return await this.ClinicRepository.save(planned)
    }
    async remove(id: number) {
        const working = await this.ClinicRepository.findOne(id)
        if (!working){
        throw new HttpException(`This ${id}wasn't found`,HttpStatus.BAD_REQUEST)
        }     
        return await this.ClinicRepository.delete(id)
        }
    async activeList(){
        const dateA=new Date()
        const patients=await this.ClinicRepository.find({where:{dateA:MoreThan(dateA)}})
        return patients
    }

}