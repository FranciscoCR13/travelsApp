export interface TravelCreate {
    name: string;
    originId: number;
    destinationId: number;
    operatorId: number;
    statusId: number;
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
    notes?: string;
    updatedAt?: string;
}

export interface Travel {
    id: number;
    name: string;
    originId: number;
    destinationId: number;
    operatorId: number;
    statusId: number;
    startDate: string;
    endDate: string;
}