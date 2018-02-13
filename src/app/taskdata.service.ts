import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


class BusinessData {
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

class TaskType {
  name: string;
  data: BusinessData;

  constructor(name: string){
    this.name = name;
  }

  setBusinessData(data: BusinessData){
    this.data = data;
  }
}


@Injectable()
export class TaskdataService {
  // private tasks = new BehaviorSubject<any>(['task1','task2']);
  private tasktypes = new Array<TaskType>(); //: TaskType[];

  constructor() {
    // this.tasktypes = new Array<TaskType>();
  }

  addTaskType(task: TaskType){
    // var task = new TaskType(string);
    this.tasktypes.push(task);
  }

  // getTaskForName(name: string){
  //   return
  // }


  removeTaskType(task: TaskType) {
    var index = this.tasktypes.indexOf(task);
    this.tasktypes.splice(index, index);
  }

}
