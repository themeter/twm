import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class TaskdataService {
  private tasks = new BehaviorSubject<any>(['task1','task2']);

  constructor() { }

}
