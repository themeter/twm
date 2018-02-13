import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TaskEditComponent } from './task-edit/task-edit.component'

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  }
  {
    path: 'taskEdit',
    component: TaskEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
