import { Component, OnInit } from "@angular/core";
import { LessonService } from "../services/lesson.service";
import { Router } from "@angular/router";
import { NbDialogService } from "@nebular/theme";
import { DeleteModalComponent } from "../../../shared/delete-modal/delete-modal.component";

@Component({
  selector: "ngx-lesson-list",
  templateUrl: "./lesson-list.component.html",
  styleUrls: ["./lesson-list.component.scss"],
})
export class LessonListComponent implements OnInit {
  lessons: any[];

  constructor(
    private router: Router,
    private lessonService: LessonService,
    private dialogService: NbDialogService
  ) {}

  ngOnInit(): void {
    this.lessonService.getLessons().subscribe((data: any) => {
      this.lessons = data.data;
    });
  }

  onClickEdit(id: number) {
    this.router.navigate(["/pages/lesson-form", id]);
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
    // this.categoryService.removeCategory(id).subscribe(() => {
    //   this.router.navigate(["/pages/categories"]);
    // });
  }
}
