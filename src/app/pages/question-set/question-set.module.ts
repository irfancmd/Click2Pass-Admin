import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionSetFormComponent } from './question-set-form/question-set-form.component';
import { QuestionSetListComponent } from './question-set-list/question-set-list.component';
import { RouterLink } from '@angular/router';
import { NbActionsModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbDatepickerModule, NbIconModule, NbInputModule, NbRadioModule, NbSelectModule, NbUserModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { FormsRoutingModule } from '../forms/forms-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { QuestionsModule } from '../questions/questions.module';
import { CategoriesModule } from '../categories/categories.module';



@NgModule({
  declarations: [
    QuestionSetFormComponent,
    QuestionSetListComponent
  ],
  imports: [
    CommonModule,
    RouterLink,
    NbCardModule,
    ThemeModule,
    NbInputModule,
    NbButtonModule,
    NbActionsModule,
    NbUserModule,
    NbCheckboxModule,
    NbRadioModule,
    NbDatepickerModule,
    FormsRoutingModule,
    NbSelectModule,
    NbIconModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CategoriesModule,
    QuestionsModule,
  ]
})
export class QuestionSetModule { }
