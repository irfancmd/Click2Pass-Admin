import { Component, OnInit } from "@angular/core";
import { CategoryService } from "../services/category.service";
import { Router } from "@angular/router";

@Component({
  selector: "ngx-category-list",
  templateUrl: "./category-list.component.html",
  styleUrls: ["./category-list.component.scss"],
})
export class CategoryListComponent implements OnInit {
  categories: any[];

  constructor(
    private router: Router,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((data: any) => {
      this.categories = data.data;
    });
  }

  onClickEdit(id: number) {
    alert("Hello " + id);
  }

  onClickDelete(id: number) {
    this.categoryService.removeCategory(id).subscribe(() => {
      this.router.navigate(["/pages/categoreis"]);
    });
  }
}
