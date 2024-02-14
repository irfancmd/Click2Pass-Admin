import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CurriculumFormComponent } from "./curriculum-form/curriculum-form.component";
import { CurriculumListComponent } from "./curriculum-list/curriculum-list.component";
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
import { CurriculumService } from "./services/curriculum.service";

@NgModule({
  declarations: [CurriculumFormComponent, CurriculumListComponent],
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
  exports: [CurriculumFormComponent, CurriculumListComponent],
  providers: [CurriculumService],
})
export class CurriculumModule {}
