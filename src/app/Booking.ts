export interface Booking{
    id?: number;
    clientName: string;
    clientEmail: string;
    userId: number;
    serviceId: number;
    dateTime: string;
}

export interface EventData{
    title: string;
    duration: string;
}