import { NgModule } from "@angular/core";
import { NbMenuModule } from "@nebular/theme";

import { ThemeModule } from "../@theme/theme.module";
import { PagesComponent } from "./pages.component";
import { DashboardModule } from "./dashboard/dashboard.module";
import { ECommerceModule } from "./e-commerce/e-commerce.module";
import { PagesRoutingModule } from "./pages-routing.module";
import { MiscellaneousModule } from "./miscellaneous/miscellaneous.module";
import { QuestionsModule } from "./questions/questions.module";
import { CategoriesModule } from "./categories/categories.module";
import { LessonsModule } from "./lessons/lessons.module";

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    ECommerceModule,
    MiscellaneousModule,
    QuestionsModule,
    CategoriesModule,
    LessonsModule,
  ],
  declarations: [PagesComponent],
})
export class PagesModule {}
