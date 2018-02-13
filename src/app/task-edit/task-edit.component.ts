import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition, keyframes, query, stagger } from '@angular/animations';

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
  arraytvar = false;

  constructor() { }

  ngOnInit() {
  }

  addField(){
    var temp = this.fieldType + ' : ' + this.fieldName + ' in: ' + this.inputvar;
    this.fields.push(temp);
    this.fieldName = '';
  }

  removeField(index){
    this.fields.splice(index, 1);
  }
}
