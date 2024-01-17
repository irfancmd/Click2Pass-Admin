import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { QuestionListComponent } from "./question-list/question-list.component";
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule,
  NbIconModule,
  NbInputModule,
  NbRadioModule,
  NbSelectModule,
  NbUserModule,
} from "@nebular/theme";
import { QuestionFormComponent } from "./question-form/question-form.component";
import { RouterLink } from "@angular/router";
import { ThemeModule } from "../../@theme/theme.module";
import { FormsRoutingModule } from "../forms/forms-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { QuestionPreviewComponent } from './question-preview/question-preview.component';

@NgModule({
  declarations: [QuestionListComponent, QuestionFormComponent, QuestionPreviewComponent],
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
  ],
  exports: [QuestionListComponent, QuestionFormComponent],
})
export class QuestionsModule {}
