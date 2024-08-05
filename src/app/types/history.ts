export class History {
    id: number;
    userId: number;
    dateofChange: Date;
    oldDomain: string;
    newDomain: string;
    oldAmount: number;
    newAmount: number;
    actionOption?: number=2;
}