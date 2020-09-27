import { Status } from './status';

export interface LeadsEntity {
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    opportunities: string[];
    status: Status
}
