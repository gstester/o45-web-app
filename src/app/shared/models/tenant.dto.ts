import { IIdBaseDto } from "./id-base.dto";

export interface ITenant extends IIdBaseDto {
    name: string;
    isChild: boolean;
    moveIn: Date,
    moveOut: Date,    
}