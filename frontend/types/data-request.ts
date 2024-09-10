export type DataRequest = {
    id?: number;
    requestType: string;
    purpose: string;
    info: Array<DataField>;
    createdAt?: number;
    createdBy?: number;
}

export type DataField = {
    format: 'text' | 'longText' | 'number' | 'date' | 'tags' | 'boolean' | 'option';
    isRequired: boolean;
    name: string;
    description: string;
    boundValues?: Array<string>;
}
