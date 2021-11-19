import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ClinicService } from "./clinic.service";
import { PatientDto, UpdatePateintDto } from "./dto/patient.dto";

@Controller()
export class ClinicController {
    constructor(private readonly clinicService: ClinicService) { }
    @Get('/clinic/patients')
    async findall() {
        return this.clinicService.findall()
    }
    @Get('/clinic/:dentist')
    async dentist(@Param('dentist') dentist: string) {
        return this.clinicService.dintist(dentist)
    }
    @Get('/clinic/active')
    async active() {
        return this.clinicService.activeList()
    }
    @Post('/clinic/create')
    create(@Body() createPatient: PatientDto) {
        return this.clinicService.create(createPatient)
    }
    @Put('/clinic/:id')
    update(@Param('patientId') patientId: number, @Body() updatePateintDto: UpdatePateintDto) {
        return this.clinicService.update(patientId, updatePateintDto)
    }
    @Delete(':id')
    remove(@Param('patientId') patientId: number){
        return this.clinicService.remove(patientId)
    }
}