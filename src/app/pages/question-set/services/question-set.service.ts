import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class QuestionSetService {
  public tempData = [
    {
      name: "Set-A",
      description: "Test",
      tempQuestionIds: "1, 3",
    },
    {
      name: "Set-A",
      description: "Test",
      tempQuestionIds: "1, 3",
    },
  ];

  constructor(private httpClient: HttpClient) {}

  getQuestionSets() {
    // return this.httpClient.get("http://localhost:3000/question-set");

    return of({ data: this.tempData });
  }

  createQuestionSets(questionSet: any) {
    // return this.httpClient.post("http://localhost:3000/question-set", questionSet);

    this.tempData.push(questionSet);

    return of({ data: this.tempData });
  }
}
