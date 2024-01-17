import { Component, OnInit } from "@angular/core";
import { QuestionService } from "../services/question.service";

@Component({
  selector: "ngx-question-preview",
  templateUrl: "./question-preview.component.html",
  styleUrls: ["./question-preview.component.scss"],
})
export class QuestionPreviewComponent implements OnInit {
  questions = [];

  constructor(private questionService: QuestionService) {}

  ngOnInit(): void {
    this.questionService.tempGetQuestions().subscribe((data) => {
      this.questions = data.data;
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
