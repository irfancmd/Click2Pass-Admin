import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionSetFormComponent } from './question-set-form/question-set-form.component';
import { QuestionSetListComponent } from './question-set-list/question-set-list.component';



@NgModule({
  declarations: [
    QuestionSetFormComponent,
    QuestionSetListComponent
  ],
  imports: [
    CommonModule
  ]
})
export class QuestionSetModule { }
