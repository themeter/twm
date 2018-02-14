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
  fields = [];
  fieldName = '';
  fieldType = '';
  inputvar = false;
  outputvar = false;
  arrayvar = false;

  tasktypes = [];
  taskName = '';
  taskFields = [];
  task;

  constructor(private _taskdata: TaskdataService, private route: ActivatedRoute) { }

  ngOnInit() {
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
    // push to ui array
    var temp = field.type + ' : ' + field.name + ' in: ' + field.input;
    this.fields.push(temp);
    this.fieldName = '';

  }

  removeField(index){
    //remove from bd
    // this.taskFields.splice(this.taskFields.indexOf())
    var name = this.fields[index];
    this.taskFields = this.taskFields.filter(function(item){
        return item.name !== name;
    });
    //remove from ui
    this.fields.splice(index, 1);

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

  applyBusinessData(){
    //apply bd array to task
    this.task.data = this.taskFields;
    //replace task in temp list
    this.tasktypes.splice(this.tasktypes.indexOf(this.task, 1));
    this.tasktypes.push(this.task);
    //update shared list of tasks
    this._taskdata.sharedChangeTask(this.tasktypes);

  }

  loadBD(){
    if(this.task.data != undefined ){
        this.taskFields = this.task.data;
        for( var val of this.taskFields){
          var temp = val.type + ' : ' + val.name + ' in: ' + val.input;
          this.fields.push(temp);
        }
    }
  }

}
