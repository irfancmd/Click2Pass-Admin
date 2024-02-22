import { Component, OnInit } from "@angular/core";
import { QuestionService } from "../services/question.service";
import { Router } from "@angular/router";
import { NbDialogService } from "@nebular/theme";
import { DeleteModalComponent } from "../../../shared/delete-modal/delete-modal.component";

@Component({
  selector: "ngx-question-list",
  templateUrl: "./question-list.component.html",
  styleUrls: ["./question-list.component.scss"],
})
export class QuestionListComponent implements OnInit {
  questions = [];

  constructor(
    private router: Router,
    private questionService: QuestionService,
    private dialogService: NbDialogService
  ) {}

  ngOnInit(): void {
    this.questionService.getQuestions().subscribe((data: any) => {
      this.questions = data.data;
    });
  }

  onClickEdit(id: number) {
    this.router.navigate(["/pages/question-form", id]);
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

  getQuestionType(question: any) {
    if (question) {
      switch (question.questionType) {
        case 0:
          return "Written";
        case 1:
          return "Multiple Choice";
        default:
          return "Unknown";
      }
    }

    return "Unknown";
  }
}
