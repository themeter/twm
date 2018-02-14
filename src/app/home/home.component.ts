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

    tasktypes = [];


    constructor(private _taskdata: TaskdataService, private http: HttpClient) { }

    ngOnInit() {
        // this._taskdata.tasks.subscribe(res => this.tasks = res);
        this._taskdata.tasktype.subscribe(res => this.tasktypes = res);
        this._taskdata.sharedChangeTask(this.tasktypes);
    }

    addTask() {
       

        //UI model
        // this.tasks.push(this.taskName);
        // this.taskName = '';

        this.tasktypes.push(new TaskType(this.taskName));
        this.taskName = '';
        this._taskdata.sharedChangeTask(this.tasktypes);
        // this.tasks = this.tasktypes.tasks;
        // this.taskName = '';

    }
    
    deployTask(task) {
        console.log(task.name);
        //create task project
        this.http.put(`${window.location.pathname}rest/sag/task/project/TaskProject`, {}).toPromise().then((res) => {
         //create task
         this.http.post(`${window.location.pathname}rest/sag/task`, { taskTypeName: task.name, taskProjectName: "TaskProject" }).subscribe(res => console.log(res));
        
         }).catch((res) => {
           console.log(res);
         });
        //TODO read and submit task data as well
    }
    
    removeItem(index) {
        // this.tasks.splice(index, 1);
        // // this._data.sharedChangeGoal(this.goals);

        this.tasktypes.splice(index, 1);
        this._taskdata.sharedChangeTask(this.tasktypes);
        // this._data.sharedChangeTask(this.tasktypes);

    }

    enable() {
        this.activeTask = false;
    }

}
