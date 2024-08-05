export class Tithe {

    sumOfExpenses: number;

    sumOfRevenues: number;

    dateTithe: Date;
}


export class searchTithe {
    fromDate: Date;
    toDate: Date;
    allDate: boolean;
}

export class tithesData {
    titheList :Array<Tithe>;
    skipMonth : boolean;
}
