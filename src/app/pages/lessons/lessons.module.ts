import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LessonFormComponent } from "./lesson-form/lesson-form.component";
import { LessonListComponent } from "./lesson-list/lesson-list.component";
import { RouterLink } from "@angular/router";
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
import { ThemeModule } from "../../@theme/theme.module";
import { FormsRoutingModule } from "../forms/forms-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { CategoriesModule } from "../categories/categories.module";
import { LessonService } from "./services/lesson.service";

@NgModule({
  declarations: [LessonFormComponent, LessonListComponent],
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
  ],
  exports: [LessonFormComponent, LessonListComponent],
  providers: [LessonService],
})
export class LessonsModule {}
