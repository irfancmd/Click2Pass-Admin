import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { LessonService } from "../services/lesson.service";
import { CategoryService } from "../../categories/services/category.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "ngx-lesson-form",
  templateUrl: "./lesson-form.component.html",
  styleUrls: ["./lesson-form.component.scss"],
})
export class LessonFormComponent implements OnInit {
  public lessonForm = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    description: new FormControl(""),
    chapterId: new FormControl(window.localStorage.getItem("lf-selectedChapterId") ??  "0", [Validators.required]),
  });

  public categorySelectItems: any[] = [];

  public lessonToBeUpdated: any = null;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private lessonService: LessonService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    const lessonId = this.activatedRoute.snapshot.params["id"];

    this.categoryService.getCategories().subscribe((data: any) => {
      if (data.data) {
        this.categorySelectItems = data.data.map((category: any) => {
          return {
            value: category.id,
            text: category.name,
          };
        });
      }

      if (lessonId) {
        this.lessonService.getById(lessonId).subscribe((data: any) => {
          this.lessonToBeUpdated = data.data;

          this.lessonForm.patchValue({
            name: this.lessonToBeUpdated.name ?? null,
            description: this.lessonToBeUpdated.description ?? null,
            chapterId: this.lessonToBeUpdated.chapterId ?? "0",
          });
        });
      }
    });

    this.lessonForm.controls.chapterId.valueChanges.subscribe(chapterId => {
      window.localStorage.setItem("lf-selectedChapterId", chapterId);
    });
  }

  onSubmit() {
    const chapterId = this.lessonForm.get("chapterId")?.value;

    if (this.lessonForm.controls.name.value && chapterId && chapterId != "0") {
      if (!this.lessonToBeUpdated) {
        // Create
        this.lessonService
          .createLesson({
            ...this.lessonForm.value,
            chapterId: chapterId !== "0" ? parseInt(chapterId) : null,
          })
          .subscribe(() => {
            this.router.navigate(["/pages/lessons"]);
          });
      } else {
        // Update
        this.lessonService
          .update(this.lessonToBeUpdated.id, this.lessonForm.value)
          .subscribe(() => {
            this.router.navigate(["/pages/lessons"]);
          });
      }
    }
  }
}
