import { IIdBaseDto } from "./id-base.dto";
import { ITenant } from './tenant.dto';
import { FlatType } from './enumeration';


export interface IFlat extends IIdBaseDto {
    type: FlatType;
    name: string;
    description: string;
    basisParts: number;

    tenants: ITenant[];
    tenantCount: number;
}
