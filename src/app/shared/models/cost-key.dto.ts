
import { IIdBaseDto } from "./id-base.dto";
import { IUpfrontPayment } from './upfront-payment.dto';

export interface ICostKey extends IIdBaseDto {
    year: number;
    from: Date;
    to: Date;
    
    heatingBasisCostKey: number;
    heatingUsageCostKey: number;

    waterBasisCostKey: number;
    waterUsageCostKey: number;

    upfrontPayments: Array<IUpfrontPayment>;
}

