import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CategoryService } from "../services/category.service";

@Component({
  selector: "ngx-category-form",
  templateUrl: "./category-form.component.html",
  styleUrls: ["./category-form.component.scss"],
})
export class CategoryFormComponent {
  public categoryForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
    description: new FormControl(""),
  });

  constructor(private categoryService: CategoryService) {}

  onSubmit() {
    this.categoryService.createCategory(this.categoryForm.value).subscribe();
  }
}
