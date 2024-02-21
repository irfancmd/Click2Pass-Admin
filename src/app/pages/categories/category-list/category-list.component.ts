import { Component, OnInit } from "@angular/core";
import { CategoryService } from "../services/category.service";
import { Router } from "@angular/router";
import { NbDialogService } from "@nebular/theme";
import { DeleteModalComponent } from "../../../shared/delete-modal/delete-modal.component";

@Component({
  selector: "ngx-category-list",
  templateUrl: "./category-list.component.html",
  styleUrls: ["./category-list.component.scss"],
})
export class CategoryListComponent implements OnInit {
  categories: any[];

  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private dialogService: NbDialogService
  ) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((data: any) => {
      this.categories = data.data;
    });
  }

  onClickEdit(id: number) {
    this.router.navigate(["/pages/category-form", id]);
  }

  onDelete() {
    console.log("Deletting");
  }

  onClickDelete(id: number) {
    this.dialogService.open(DeleteModalComponent, {
      context: {
        onDeleteFunction: this.onDelete,
      },
    });
    // this.categoryService.removeCategory(id).subscribe(() => {
    //   this.router.navigate(["/pages/categories"]);
    // });
  }
}
