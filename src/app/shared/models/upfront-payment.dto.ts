import { FlatType } from './enumeration';

export interface IUpfrontPayment {
    type: FlatType;
    basis: number;
    usage: number;
}
