import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "ngx-question-list",
  templateUrl: "./question-list.component.html",
  styleUrls: ["./question-list.component.scss"],
})
export class QuestionListComponent implements OnInit {
  questions = [];
  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.httpClient
      .get("http://localhost:3000/question")
      .subscribe((data: any) => {
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
