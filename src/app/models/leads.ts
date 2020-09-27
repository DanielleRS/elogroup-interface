import { Status } from './status';

export interface Leads {
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    statusDescription: string;
    opportunities: string[];
}
