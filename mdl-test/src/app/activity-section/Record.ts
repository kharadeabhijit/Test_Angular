export interface Record {
    data: RecordData [];
}

export interface RecordData{
    id: string;
    columnName: string;
    columnType: string;
    editable: string;
}