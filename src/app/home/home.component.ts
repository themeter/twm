import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition, keyframes, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('tasksx', [
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
export class HomeComponent implements OnInit {
  bla: string = 'Add Task';
  taskName = '';
  tasks = [];
  activeTask = true;
  // tasks = [];
  //   'one',
  //   'two'
  // ];

  constructor() { }

  ngOnInit() {
  }

  addTask(){
    this.tasks.push(this.taskName);
    this.taskName = '';
  }

  removeItem(index){
    this.tasks.splice(index, 1);
    // this._data.sharedChangeGoal(this.goals);
  }

  enable(){
    this.activeTask = false;
  }

}
