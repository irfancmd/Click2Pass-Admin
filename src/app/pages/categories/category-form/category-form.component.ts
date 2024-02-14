import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CategoryService } from "../services/category.service";
import { CurriculumService } from "../../curriculum/services/curriculum.service";

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
    this.categoryService.createCategory(this.categoryForm.value).subscribe();
  }
}
