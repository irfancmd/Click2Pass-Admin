import { Component, OnInit } from "@angular/core";
import { QuestionSetService } from "../services/question-set.service";
import { QuestionService } from "../../questions/services/question.service";

@Component({
  selector: "ngx-question-set-list",
  templateUrl: "./question-set-list.component.html",
  styleUrls: ["./question-set-list.component.scss"],
})
export class QuestionSetListComponent implements OnInit {
  // public questionSetSelectItems: any[] = [];
  public questionSets: any[] = [];

  constructor(
    private questionSetService: QuestionSetService,
    private questionService: QuestionService
  ) {}

  ngOnInit(): void {
    this.questionSetService.getQuestionSets().subscribe((data: any) => {
      if (data.data) {
        this.questionSets = data.data;
        // this.questionSetService = data.data.map((questionSet: any) => {
        //   return {
        //     value: questionSet.id,
        //     text: questionSet.name,
        //   };
        // });
      }
    });
  }
}
