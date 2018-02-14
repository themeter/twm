import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

@Injectable()
export class BDField {
  type: string;
  name: any;
  input: boolean;
  output: boolean;
  array: boolean;

  constructor(type: string, name: any, input: boolean, output: boolean, array: boolean) {
    this.type = type;
    this.name = name;
    this.input = input;
    this.output = output;
    this.array = array;
  }
}

@Injectable()
export class TaskType {
  name: string;
  data: BDField[];

  constructor(name: string){
    this.name = name;
  }
}


@Injectable()
export class TaskdataService {
  // private tasks = new BehaviorSubject<any>([]);
  // private tasktypes = new Array<TaskType>(); //: TaskType[];
  private tasktypes = new BehaviorSubject<any>([]);
  tasktype = this.tasktypes.asObservable();

  constructor() {
    // this.tasktypes = new Array<TaskType>();
  }

  sharedChangeTask(t){
    this.tasktypes.next(t);
  }

  // addTaskType(task: TaskType){
  //   // var task = new TaskType(string);
  //   this.tasktypes.push(task);
  // }
  //
  // // getTaskForName(name: string){
  // //   return
  // // }
  //
  //
  // removeTaskType(task: TaskType) {
  //   var index = this.tasktypes.indexOf(task);
  //   this.tasktypes.splice(index, index);
  // }

}
