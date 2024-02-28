import { Component, OnInit } from "@angular/core";
import { CategoryService } from "../services/category.service";
import { Router } from "@angular/router";
import { NbDialogService } from "@nebular/theme";
import { DeleteModalComponent } from "../../../shared/delete-modal/delete-modal.component";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: "ngx-category-list",
  templateUrl: "./category-list.component.html",
  styleUrls: ["./category-list.component.scss"],
})
export class CategoryListComponent implements OnInit {
  categories: any[];

  public searchForm = new FormGroup({
    searchText: new FormControl(null),
  });

  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private dialogService: NbDialogService
  ) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((data: any) => {
      this.categories = data.data;
    });

    this.searchForm.valueChanges.subscribe((controlValues) => {
      if (controlValues.searchText) {
        this.categoryService.getCategories().subscribe((data: any) => {
          this.categories = data.data.filter((e) =>
            e.name
              .toLowerCase()
              .includes(controlValues.searchText.toLowerCase())
          );
        });
      } else {
        this.categoryService.getCategories().subscribe((data: any) => {
          this.categories = data.data;
        });
      }
    });
  }

  onClickEdit(id: number) {
    this.router.navigate(["/pages/category-form", id]);
  }

  onDelete(id: number) {
    return () => {
      this.categoryService.removeCategory(id).subscribe(() => {
        this.categories = this.categories.filter((e) => e.id != id);
      });
    };
  }

  onClickDelete(id: number) {
    this.dialogService.open(DeleteModalComponent, {
      context: {
        onDeleteFunction: this.onDelete(id),
      },
    });
  }
}
