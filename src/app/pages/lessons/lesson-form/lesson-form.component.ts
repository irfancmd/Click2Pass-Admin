import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { LessonService } from "../services/lesson.service";
import { CategoryService } from "../../categories/services/category.service";
import { Router } from "@angular/router";

@Component({
  selector: "ngx-lesson-form",
  templateUrl: "./lesson-form.component.html",
  styleUrls: ["./lesson-form.component.scss"],
})
export class LessonFormComponent implements OnInit {
  public lessonForm = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    description: new FormControl(""),
    categoryId: new FormControl("0", [Validators.required]),
  });

  public categorySelectItems: any[] = [];

  constructor(
    private router: Router,
    private lessonService: LessonService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((data: any) => {
      if (data.data) {
        this.categorySelectItems = data.data.map((category: any) => {
          return {
            value: category.id,
            text: category.name,
          };
        });
      }
    });
  }

  onSubmit() {
    const categoryId = this.lessonForm.get("categoryId")?.value;

    if (
      this.lessonForm.controls.name.value &&
      categoryId &&
      categoryId != "0"
    ) {
      this.lessonService
        .createLesson({
          ...this.lessonForm.value,
          categoryId: categoryId !== "0" ? parseInt(categoryId) : null,
        })
        .subscribe(() => {
          this.router.navigate(["/pages/lessons"]);
        });
    }
  }
}
