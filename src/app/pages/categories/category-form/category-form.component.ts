import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CategoryService } from "../services/category.service";
import { CurriculumService } from "../../curriculum/services/curriculum.service";
import { Router } from "@angular/router";

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

  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private curriculumService: CurriculumService
  ) {}

  ngOnInit(): void {
    this.curriculumService.getCurriculums().subscribe((data: any) => {
      if (data.data) {
        this.curriculumSelectItems = data.data.map((curriculum: any) => {
          return {
            value: curriculum.id,
            text: curriculum.name,
          };
        });
      }
    });
  }

  onSubmit() {
    if (
      this.categoryForm.controls.name.value &&
      this.categoryForm.controls.curriculumId.value != "0"
    ) {
      this.categoryService.createCategory(this.categoryForm.value).subscribe();
      this.router.navigate(["/pages/category-list"]);
    }
  }
}
