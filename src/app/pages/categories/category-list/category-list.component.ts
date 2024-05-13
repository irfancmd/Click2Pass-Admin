import { Component, OnInit } from "@angular/core";
import { CategoryService } from "../services/category.service";
import { Router } from "@angular/router";
import { NbDialogService } from "@nebular/theme";
import { DeleteModalComponent } from "../../../shared/delete-modal/delete-modal.component";
import { FormControl, FormGroup } from "@angular/forms";
import { CurriculumService } from "../../curriculum/services/curriculum.service";

@Component({
  selector: "ngx-category-list",
  templateUrl: "./category-list.component.html",
  styleUrls: ["./category-list.component.scss"],
})
export class CategoryListComponent implements OnInit {
  categories: any[];
  public curriculumSelectItems: any[] = [];

  public searchForm = new FormGroup({
    searchText: new FormControl(null),
    curriculumId: new FormControl(
      window.localStorage.getItem("chsf-selectedCurriculumId") ?? "0"
    ),
  });

  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private curriculumService: CurriculumService,
    private dialogService: NbDialogService
  ) {}

  ngOnInit(): void {
    this.searchForm.controls.curriculumId.valueChanges.subscribe(
      (curriculumId) => {
        window.localStorage.setItem("chsf-selectedCurriculumId", curriculumId);
      }
    );

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

    this.onSearch();
  }

  onSearch() {
    this.categoryService.getCategories().subscribe((data: any) => {
      let categoryList = data.data;

      let searchText = this.searchForm.controls.searchText.value;
      let curriculumId = this.searchForm.controls.curriculumId.value;

      if (searchText) {
        categoryList = categoryList.filter((e) =>
          e.name.toLowerCase().includes(searchText.toLowerCase())
        );
      }

      if (curriculumId && curriculumId != "0") {
        categoryList = categoryList.filter(
          (e) => e.curriculum.id == curriculumId
        );
      }

      this.categories = categoryList;
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
