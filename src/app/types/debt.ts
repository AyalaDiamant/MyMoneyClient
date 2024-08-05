import { Area } from "./area";
import { IdName } from "./id-name";
import { User2Area } from "./User2Area";

export class Debt {
    id: number;
    description: string;
    payments: number=1;
    urgency: IdName;
    userId: number;
    sum: number;
    isActive: boolean = true;
    inEdit: boolean;
    areaid:Area;
    constructor() {
        this.urgency = new IdName();
        this.urgency.id = 0;
        this.areaid = new Area();
    }
}

export class DebtSearchDetails {
    description: string="";
    payments: string="";
    urgency: string="";
    sum: string = "";
}

