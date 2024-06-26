import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CategoryFormComponent } from "./category-form/category-form.component";
import { CategoryListComponent } from "./category-list/category-list.component";
import { RouterLink } from "@angular/router";
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule,
  NbDialogModule,
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
import { CategoryService } from "./services/category.service";
import { SharedModule } from "../../shared/shared.module";
import { CurriculumModule } from "../curriculum/curriculum.module";

@NgModule({
  declarations: [CategoryFormComponent, CategoryListComponent],
  imports: [
    CommonModule,
    SharedModule,
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
    NbDialogModule,
    CurriculumModule,
  ],
  exports: [CategoryFormComponent, CategoryListComponent],
  providers: [CategoryService],
})
export class CategoriesModule {}
