export default interface IPatient{
    readonly patientId:number;
    readonly patientName:string;
    readonly dentistName:'Adilet'|'Feruza';
    readonly dateA:Date|string|boolean;
    readonly dateB?:Date|boolean;
}