import { IdName } from "./id-name";

export class UserGlobal {
    id: number
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    password: string;
    isActive: boolean;
    userType: IdName;
    registerDate: Date;
    isYearlyPay: boolean;
    payDate: Date;
    lender: IdName;
    manager: IdName;
    isbusiness:boolean;
    constructor() {
        this.userType = new IdName();
        this.lender = new IdName();
        this.lender.id = 0;
        this.manager = new IdName();
        this.manager.id = 0;
        this.registerDate = new Date();
        
    }
}

export class User extends UserGlobal {
    token: any;

}


export class UserSearch {
    usersType: IdName;
    usersUnderLender: IdName;
    lendersUnderManager: IdName;

    Email: string;
    FirstName: string;
    LastName: string;
    Phone: string;
    

    constructor() {
        this.usersType = new IdName();
        this.usersUnderLender = new IdName();
        this.lendersUnderManager = new IdName();

        this.Email = "";
        this.FirstName = "";
        this.LastName = "";
        this.Phone = "";
       
    }
}

