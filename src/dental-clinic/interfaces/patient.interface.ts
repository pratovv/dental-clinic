export default interface IPatient{
    readonly patientId:number;
    readonly patientName:string;
    readonly dentistName:'Adilet'|'Feruza';
    readonly dateA:Date|string;
    readonly dateB:Date;
}