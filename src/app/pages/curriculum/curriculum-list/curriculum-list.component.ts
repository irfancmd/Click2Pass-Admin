import { Component, OnInit } from "@angular/core";
import { CurriculumService } from "../services/curriculum.service";
import { Router } from "@angular/router";
import { DeleteModalComponent } from "../../../shared/delete-modal/delete-modal.component";
import { NbDialogService } from "@nebular/theme";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: "ngx-curriculum-list",
  templateUrl: "./curriculum-list.component.html",
  styleUrls: ["./curriculum-list.component.scss"],
})
export class CurriculumListComponent implements OnInit {
  curriculums: any[];

  public searchForm = new FormGroup({
    searchText: new FormControl(null),
  });

  constructor(
    private curriculumService: CurriculumService,
    private router: Router,
    private dialogService: NbDialogService
  ) {}

  ngOnInit(): void {
    this.curriculumService.getCurriculums().subscribe((data: any) => {
      this.curriculums = data.data;
    });

    this.searchForm.valueChanges.subscribe((controlValues) => {
      if (controlValues.searchText) {
        this.curriculumService.getCurriculums().subscribe((data: any) => {
          this.curriculums = data.data.filter((e) =>
            e.name
              .toLowerCase()
              .includes(controlValues.searchText.toLowerCase())
          );
        });
      } else {
        this.curriculumService.getCurriculums().subscribe((data: any) => {
          this.curriculums = data.data;
        });
      }
    });
  }

  onClickEdit(id: number) {
    this.router.navigate(["/pages/curriculum-form", id]);
  }

  onDelete() {
    console.log("Deleting");
  }

  onClickDelete(id: number) {
    this.dialogService.open(DeleteModalComponent, {
      context: {
        onDeleteFunction: this.onDelete,
      },
    });
  }
}
