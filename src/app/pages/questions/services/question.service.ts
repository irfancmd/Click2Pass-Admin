import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private httpClient: HttpClient) { }

  tempGetQuestions() {
    return of({
      data: [
        {
          id: 1,
          questionText: "What is it - 1?",
          numberOfOptionsVisible: 1,
          categoryId: 1,
          categoryName: "Category A",
          correctAnswerText: "1",
          answerOption1Text: "It's a thing."
        },
        {
          id: 2,
          questionText: "What is it - 2?",
          numberOfOptionsVisible: 1,
          categoryId: 2,
          categoryName: "Category B",
          correctAnswerText: "1",
          answerOption1Text: "It's a thing."
        },
        {
          id: 3,
          questionText: "What is it - 3?",
          numberOfOptionsVisible: 1,
          categoryId: 3,
          categoryName: "Category C",
          correctAnswerText: "1",
          answerOption1Text: "It's a thing."
        },
      ]
    }); 
  }
}
