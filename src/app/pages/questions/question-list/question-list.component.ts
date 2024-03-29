import { Component, OnInit } from "@angular/core";
import { QuestionService } from "../services/question.service";
import { Router } from "@angular/router";
import { NbDialogService } from "@nebular/theme";
import { DeleteModalComponent } from "../../../shared/delete-modal/delete-modal.component";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: "ngx-question-list",
  templateUrl: "./question-list.component.html",
  styleUrls: ["./question-list.component.scss"],
})
export class QuestionListComponent implements OnInit {
  questions = [];

  public searchForm = new FormGroup({
    searchText: new FormControl(null),
  });

  constructor(
    private router: Router,
    private questionService: QuestionService,
    private dialogService: NbDialogService
  ) {}

  ngOnInit(): void {
    this.questionService.getQuestions().subscribe((data: any) => {
      this.questions = data.data;
    });

    this.searchForm.valueChanges.subscribe((controlValues) => {
      if (controlValues.searchText) {
        this.questionService.getQuestions().subscribe((data: any) => {
          this.questions = data.data.filter((e) =>
            e.questionText
              .toLowerCase()
              .includes(controlValues.searchText.toLowerCase())
          );
        });
      } else {
        this.questionService.getQuestions().subscribe((data: any) => {
          this.questions = data.data;
        });
      }
    });
  }

  onClickEdit(id: number) {
    this.router.navigate(["/pages/question-form", id]);
  }

  onDelete(id: number) {
    return () => {
      this.questionService.remove(id).subscribe(() => {
        this.questions = this.questions.filter((e) => e.id != id);
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
