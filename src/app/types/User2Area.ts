import { IdNameDB } from "./id-name";

export class User2Area
{
     id :number;
     area: IdNameDB;
    

     constructor(){
        this.area = new IdNameDB();
     }
    // Id:number;
    // Description:string;
    // Payments:number;
    // UrgencyId:number;
    // UserId:number;
    // IsActive:boolean;
    // Sum:number;
    // AreaId:number;


}
// export class User2Area{
    
// }


// public int Id { get; set; }

// public string? Description { get; set; }

// public int Payments { get; set; }

// public int UrgencyId { get; set; }

// public int UserId { get; set; }

// public bool IsActive { get; set; }

// public int Sum { get; set; }

// public int AreaId { get; set; }

// public virtual User2Area Area { get; set; }

// public virtual UrgencyDebt Urgency { get; set; } = null!;

// public virtual User User { get; set; } = null!;

// public virtual ICollection<User2Area> User2Areas { get; set; } = new List<User2Area>();