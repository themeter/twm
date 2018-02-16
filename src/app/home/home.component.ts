import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition, keyframes, query, stagger } from '@angular/animations';
import { TaskdataService } from '../taskdata.service';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TaskType } from '../taskdata.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    animations: [
        trigger('tasksx', [
            transition('* => *', [
                query(':enter', style({ opacity: 0 }), { optional: true }),
                query(':enter', stagger('300ms', [
                    animate('.6s ease-in', keyframes([
                        style({ opacity: 0, transform: 'translateY(-75%)', offset: 0 }),
                        style({ opacity: .5, transform: 'translateY(35px)', offset: .3 }),
                        style({ opacity: 1, transform: 'translateY(0)', offset: 1 })
                    ]))
                ]), { optional: true }),
                query(':leave', stagger('300ms', [
                    animate('.6s ease-in', keyframes([
                        style({ opacity: 1, transform: 'translateY(0)', offset: 0 }),
                        style({ opacity: .5, transform: 'translateY(35px)', offset: .3 }),
                        style({ opacity: 0, transform: 'translateY(-75%)', offset: 1 })
                    ]))
                ]), { optional: true }),
            ])
        ])
    ]
})
export class HomeComponent implements OnInit {
    bla: string = 'Add Task';
    taskName = '';
    tasks = [];
    activeTask = true;

    tasktypes = new Array<TaskType>();


    constructor(private _taskdata: TaskdataService, private http: HttpClient) { }

    ngOnInit() {
      this.fetchCurrentTasks();
    }

    private fetchCurrentTasks() {
      this._taskdata.tasktype.subscribe(res => this.tasktypes = res);

      if(this.tasktypes.length == 0) {
          this.http.get(`${window.location.pathname}rest/sag/task/project/TaskProject`, {}).toPromise().then((res) => {
            for(let i in res) {
              var entry = new TaskType(res[i]["taskTypeName"]);
              entry.taskTypeId = res[i]["taskTypeId"];
              this.tasktypes.push(entry);
            }
          });
      }
      this._taskdata.sharedChangeTask(this.tasktypes);
    }

    addTask() {
        this.tasktypes.push(new TaskType(this.taskName));
        this.taskName = '';
        this._taskdata.sharedChangeTask(this.tasktypes);
    }

    deployTask(task) {
      if(task.taskTypeId != null) {
        return; //TODO remove this and instead update task Data if taskTypeID != null
      }
        console.log(task.name);
        //create task project
        this.http.put(`${window.location.pathname}rest/sag/task/project/TaskProject`, {}).toPromise().then((res) => {
         //create task
         this.http.post(`${window.location.pathname}rest/sag/task`, { taskTypeName: task.name, taskProjectName: "TaskProject" }).toPromise().then(res => task.taskTypeId = res["taskTypeId"]);

         }).catch((res) => {
           console.log(res);
         });
        //TODO read and submit task data as well
    }

    removeItem(index) {
        // this.tasks.splice(index, 1);
        // // this._data.sharedChangeGoal(this.goals);
        let deletedItem = this.tasktypes[index];
        if(deletedItem.taskTypeId != null) {
        this.http.delete(`${window.location.pathname}rest/sag/task/TaskProject/` + deletedItem.taskTypeId).toPromise();
        }
        this.tasktypes.splice(index, 1);
        this._taskdata.sharedChangeTask(this.tasktypes);
        // this._data.sharedChangeTask(this.tasktypes);

    }

    enable() {
        this.activeTask = false;
    }

}
