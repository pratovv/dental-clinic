
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import IPatient from "../interfaces/patient.interface";

@Entity()
export default class PatientEntity implements IPatient {
    @PrimaryGeneratedColumn()
    patientId: number;
    @Column()
    patientName: string;
    @Column()
    dentistName: 'Adilet' | 'Feruza';
    @Column('timestamp', { nullable: false })
    dateA: Date | string|boolean;
    @Column('timestamp',{nullable:true})
    dateB:Date|boolean;
 
}