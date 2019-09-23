import { IIdBaseDto} from "./id-base.dto";
import { IFlat } from './flat.dto';
import { ICostKey } from './cost-key.dto';

export interface IUsage extends IIdBaseDto {
    heating: number;
    water: number;
    flatId: string;
    flat: IFlat;
    costKeyId: string;
    costKey: ICostKey; 
}
