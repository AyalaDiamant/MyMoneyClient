import { Component, OnInit } from '@angular/core';
import { Task, TaskSearch } from 'src/app/types/task';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { IdName, IdNameDB } from 'src/app/types/id-name';
import { GResult, Result } from 'src/app/types/result';
import { AlertService } from 'src/app/modules/infra/services/alert.service';
import id from 'date-fns/locale/id';
import { AuthService } from 'src/app/modules/account/services/auth.service';
import { User } from 'src/app/types/user';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  root: string = environment.rootUrl;
  newTask: Task = new Task();
  addMode: boolean = false;
  typeDB: IdNameDB = new IdNameDB();
  status: IdName[] = new Array<IdName>();
  urgency: IdName[] = new Array<IdName>();
  tasks: Task[] = new Array<Task>();
  inEdit: boolean = false;
  docListtask: Task[] = new Array<Task>();
  taskSearch: TaskSearch = new TaskSearch();
  lenders: User[] = new Array<User>();
  lender: User = new User();
  addModeToLender: boolean = false;
  isManager: boolean = false;
  taskToLender: Task = new Task();


  constructor(private http: HttpClient, private alert: AlertService, private auth: AuthService) {
  }


  ngOnInit(): void {
    this.taskSearch = new TaskSearch()
    this.getTasks();
    this.getStatus();
    this.getUrgency();
    this.addTaskToLenders();
    this.isManager = this.auth.getUserType() === 1;
  }
  addTask(manager: boolean) {
    // if dont add to mngr
    if (!manager) {
      this.taskToLender.userId = this.lender.id;
      this.http.post(this.root + 'Task/AddTask', this.taskToLender).subscribe((res: Result) => {
        this.alert.success("המשימה נוספה בהצלחה!")
        this.taskToLender = new Task();
        this.addMode = false;
        this.getTasks();
        console.log('addtsk1');
      });


    }

    // if  add to mngr
    else if (manager) {
      this.newTask.userId = 0;
      this.http.post(this.root + 'Task/AddTask', this.newTask).subscribe((res: Result) => {
        this.alert.success("המשימה נוספה בהצלחה!")
        this.newTask = new Task();
        this.addMode = false;
        this.getTasks();
        console.log('addtsk2');
      });

    }
  }
  getTasks() {
    this.http.post(this.root + 'Task/GetTasks', this.taskSearch).subscribe((res: GResult<Task[]>) => {
      this.tasks = res.value;
      console.log(this.tasks, 'task');
    });
  }

  changeMode() {
    this.addMode = !this.addMode
    console.log(this.addMode)
    this.newTask = new Task();
  }
  getStatus() {
    this.typeDB.tableCode = 5;
    this.typeDB.type = 5;
    // in server required name, temporarily
    this.typeDB.name = "";
    this.http.post(this.root + "List/GetList", this.typeDB).subscribe((res: GResult<IdName[]>) => {
      this.status = res.value;
    })
  }
  getUrgency() {
    this.typeDB.tableCode = 4;
    this.typeDB.type = 4;
    // in server required name, temporarily
    this.typeDB.name = "";
    this.http.post(this.root + "List/GetList", this.typeDB).subscribe((res: GResult<IdName[]>) => {
      this.urgency = res.value;
    })
  }
  editTask(task: Task) {
    this.inEdit = !this.inEdit;
    task.inEdit = !task.inEdit;
  }
  save(task: Task) {
    task.inEdit = false;
    this.http.put(this.root + 'Task/UpdateTask', task).subscribe((res: Result) => {
      if (res.success) {
        this.alert.success("המשימה עודכנה בהצלחה!")
      }
      else {
        this.alert.error("העדכון נכשל!")
      }
      this.getTasks();
    });
  }
  cancel(task: Task) {
    task.inEdit = false;
    this.getTasks();
  }


  deleteTask(id: number) {
    this.alert.remove("האם אתה בטוח שאתה רוצה למחוק?").then((result) => {
      if (result.isConfirmed == true) {
        this.http.delete(this.root + 'Task/DeleteTask/' + id).subscribe((res: Result) => {
          if (res.success) {
            this.alert.success("משימה נמחקה בהצלחה!");
            this.getTasks();


          }

        });
      }
    });
  }

  addTaskToLenders() {
    if (this.auth.getPermissionType() != 1)
      return;
    this.http.get(this.root + 'Users/getLenderByManager').subscribe((res: GResult<User[]>) => {
      this.lenders = res.value;
    })
  }
  updateTaskLender(event: any) {
    this.addModeToLender = true;
  }
}