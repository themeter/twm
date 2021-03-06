import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition, keyframes, query, stagger } from '@angular/animations';
import { TaskdataService } from '../taskdata.service';
import { TaskType } from '../taskdata.service';
import { BDField } from '../taskdata.service';
import { ActivatedRoute } from '@angular/router';
// import { Router } from '@angular/router';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss'],
  animations: [
    trigger('fieldsx', [
      transition('* => *', [
        query(':enter', style({opacity: 0}), {optional: true}),
        query(':enter', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({opacity:0, transform: 'translateY(-75%)', offset: 0}),
            style({opacity:.5, transform: 'translateY(35px)', offset: .3}),
            style({opacity:1, transform: 'translateY(0)', offset: 1})
          ]))
        ]), {optional: true}),
        query(':leave', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({opacity:1, transform: 'translateY(0)', offset: 0}),
            style({opacity:.5, transform: 'translateY(35px)', offset: .3}),
            style({opacity:0, transform: 'translateY(-75%)', offset: 1})
          ]))
        ]), {optional: true}),
      ])
    ])
  ]
})
export class TaskEditComponent implements OnInit {
  fieldName = '';
  fieldType = 'String';
  inputvar = false;
  outputvar = false;
  arrayvar = false;

  tasktypes = [];
  taskName = '';
  taskFields = [];
  task = null;

  constructor(private _taskdata: TaskdataService, private route: ActivatedRoute) { }

  ngOnInit() {
    // this.taskFields = [];
    // this.tasktypes = [];
    // this.task = null;

    // this.task.data = [];
    // console.log(this.tasktypes);
    this._taskdata.tasktype.subscribe(res => this.tasktypes = res);
    // this._taskdata.sharedChangeTask(this.tasktypes);
    this.route.params.subscribe(res => this.taskName = res.id);
    this.task = this.getTaskForName();
    this.loadBD();
  }

  addField(){
    //push to bd array
    var field = new BDField( this.fieldType, this.fieldName, this.inputvar, this.outputvar, this.arrayvar);
    this.taskFields.push(field);
    this.fieldName = '';
    // console.log(this.task.data);
  }

  removeField(index){
    //remove from bd
    this.taskFields.splice(index, 1);
  }

  getTaskForName(){
      for (var value of this.tasktypes) {
        if(value.name == this.taskName){
            console.log(value);
            return value;
        }
      }
    return null;
  }
  //
  // applyBusinessData(){
  //   //apply bd array to task
  //    this.task.data = this.taskFields.concat([]);
  //
  //   //replace task in temp list
  //   // this.tasktypes.splice(this.tasktypes.indexOf(this.task), 1);
  //   // this.tasktypes.push(this.task);
  //
  //   //update shared list of tasks
  //   this._taskdata.sharedChangeTask(this.tasktypes);
  //
  // }

  loadBD(){
    if(this.task.data != undefined ){
        console.log(this.task.data);
        this.taskFields = this.task.data;
    }
    this.task.data = this.taskFields;
  }

}
