import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class QuestionSetService {
  constructor(private httpClient: HttpClient) {}

  getQuestionSets() {
    return this.httpClient.get("http://localhost:3000/question-set");
  }

  createQuestionSets(questionSet: any) {
    return this.httpClient.post(
      "http://localhost:3000/question-set",
      questionSet
    );
  }
}
