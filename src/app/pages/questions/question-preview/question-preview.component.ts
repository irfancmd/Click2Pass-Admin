import { Component, OnInit } from "@angular/core";
import { QuestionService } from "../services/question.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "ngx-question-preview",
  templateUrl: "./question-preview.component.html",
  styleUrls: ["./question-preview.component.scss"],
})
export class QuestionPreviewComponent implements OnInit {
  public IMG_ROOT = "https://click2pass.ca/uploads/";

  public question: any;

  constructor(
    private questionService: QuestionService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const questionId = this.activatedRoute.snapshot.params["id"];

    if (questionId) {
      this.questionService
        .getQuestionById(parseInt(questionId))
        .subscribe((data: any) => {
          this.question = data.data;
        });
    }
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
