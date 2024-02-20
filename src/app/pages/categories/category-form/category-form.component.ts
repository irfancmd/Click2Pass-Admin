import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CategoryService } from "../services/category.service";
import { CurriculumService } from "../../curriculum/services/curriculum.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "ngx-category-form",
  templateUrl: "./category-form.component.html",
  styleUrls: ["./category-form.component.scss"],
})
export class CategoryFormComponent implements OnInit {
  public categoryForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
    description: new FormControl(""),
    curriculumId: new FormControl("0"),
  });

  public curriculumSelectItems: any[] = [];

  public chapterToBeUpdated: any = null;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService,
    private curriculumService: CurriculumService
  ) {}

  ngOnInit(): void {
    const chapterId = this.activatedRoute.snapshot.params["id"];

    this.curriculumService.getCurriculums().subscribe((data: any) => {
      if (data.data) {
        this.curriculumSelectItems = data.data.map((curriculum: any) => {
          return {
            value: curriculum.id,
            text: curriculum.name,
          };
        });

        if (chapterId) {
          this.categoryService.getById(chapterId).subscribe((data: any) => {
            this.chapterToBeUpdated = data.data;

            this.categoryForm.patchValue({
              name: this.chapterToBeUpdated.name ?? null,
              description: this.chapterToBeUpdated.description ?? null,
              curriculumId: this.chapterToBeUpdated.curriculumId ?? "0",
            });
          });
        }
      }
    });
  }

  onSubmit() {
    if (
      this.categoryForm.controls.name.value &&
      this.categoryForm.controls.curriculumId.value != "0"
    ) {
      if (!this.chapterToBeUpdated) {
        // Create
        this.categoryService
          .createCategory(this.categoryForm.value)
          .subscribe(() => {
            this.router.navigate(["/pages/categories"]);
          });
      } else {
        // Update
        this.categoryService
          .updateCategory(this.chapterToBeUpdated.id, this.categoryForm.value)
          .subscribe(() => {
            this.router.navigate(["/pages/categories"]);
          });
      }
    }
  }
}
