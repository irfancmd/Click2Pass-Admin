import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

import { PagesComponent } from "./pages.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ECommerceComponent } from "./e-commerce/e-commerce.component";
import { NotFoundComponent } from "./miscellaneous/not-found/not-found.component";
import { QuestionListComponent } from "./questions/question-list/question-list.component";
import { QuestionFormComponent } from "./questions/question-form/question-form.component";
import { CategoryListComponent } from "./categories/category-list/category-list.component";
import { CategoryFormComponent } from "./categories/category-form/category-form.component";
import { LessonListComponent } from "./lessons/lesson-list/lesson-list.component";
import { LessonFormComponent } from "./lessons/lesson-form/lesson-form.component";
import { QuestionSetListComponent } from "./question-set/question-set-list/question-set-list.component";
import { QuestionSetFormComponent } from "./question-set/question-set-form/question-set-form.component";
import { QuestionPreviewComponent } from "./questions/question-preview/question-preview.component";

const routes: Routes = [
  {
    path: "",
    component: PagesComponent,
    children: [
      {
        path: "questions",
        component: QuestionListComponent,
      },
      {
        path: "question-form",
        component: QuestionFormComponent,
      },
      {
        path: "questions/:id",
        component: QuestionPreviewComponent,
      },
      {
        path: "categories",
        component: CategoryListComponent,
      },
      {
        path: "category-form",
        component: CategoryFormComponent,
      },
      {
        path: "lessons",
        component: LessonListComponent,
      },
      {
        path: "lesson-form",
        component: LessonFormComponent,
      },
      {
        path: "question-set",
        component: QuestionSetListComponent,
      },
      {
        path: "question-set-form",
        component: QuestionSetFormComponent,
      },
      {
        path: "dashboard",
        component: ECommerceComponent,
      },
      {
        path: "iot-dashboard",
        component: DashboardComponent,
      },
      {
        path: "layout",
        loadChildren: () =>
          import("./layout/layout.module").then((m) => m.LayoutModule),
      },
      {
        path: "forms",
        loadChildren: () =>
          import("./forms/forms.module").then((m) => m.FormsModule),
      },
      {
        path: "ui-features",
        loadChildren: () =>
          import("./ui-features/ui-features.module").then(
            (m) => m.UiFeaturesModule
          ),
      },
      {
        path: "modal-overlays",
        loadChildren: () =>
          import("./modal-overlays/modal-overlays.module").then(
            (m) => m.ModalOverlaysModule
          ),
      },
      {
        path: "extra-components",
        loadChildren: () =>
          import("./extra-components/extra-components.module").then(
            (m) => m.ExtraComponentsModule
          ),
      },
      {
        path: "maps",
        loadChildren: () =>
          import("./maps/maps.module").then((m) => m.MapsModule),
      },
      {
        path: "charts",
        loadChildren: () =>
          import("./charts/charts.module").then((m) => m.ChartsModule),
      },
      {
        path: "editors",
        loadChildren: () =>
          import("./editors/editors.module").then((m) => m.EditorsModule),
      },
      {
        path: "tables",
        loadChildren: () =>
          import("./tables/tables.module").then((m) => m.TablesModule),
      },
      {
        path: "miscellaneous",
        loadChildren: () =>
          import("./miscellaneous/miscellaneous.module").then(
            (m) => m.MiscellaneousModule
          ),
      },
      {
        path: "dash",
        redirectTo: "dashboard",
        pathMatch: "full",
      },
      {
        path: "**",
        component: NotFoundComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
