import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "ngx-question-form",
  templateUrl: "./question-form.component.html",
  styleUrls: ["./question-form.component.scss"],
})
export class QuestionFormComponent {
  public hasQuestionMedia = false;
  public isMultipleChoice = false;
  public hasAnswerWithMedia = false;

  public questionForm = new FormGroup({
    questionText: new FormControl("", [Validators.required]),
    questionMediaUrl: new FormControl(null),
    questionMediaType: new FormControl("1"),
    numberOfOptionsVisible: new FormControl(1),
    questionType: new FormControl(1),
    correctAnswerText: new FormControl(""),
    answerOption1Text: new FormControl(""),
    answerOption1MediaUrl: new FormControl(null),
    answerOption1MediaType: new FormControl("1"),
    isAnswer1Correct: new FormControl(false),
    answerOption2Text: new FormControl(null),
    answerOption2MediaUrl: new FormControl(null),
    answerOption2MediaType: new FormControl("1"),
    isAnswer2Correct: new FormControl(false),
    answerOption3Text: new FormControl(null),
    answerOption3MediaUrl: new FormControl(null),
    answerOption3MediaType: new FormControl("1"),
    isAnswer3Correct: new FormControl(false),
    answerOption4Text: new FormControl(null),
    answerOption4MediaUrl: new FormControl(null),
    answerOption4MediaType: new FormControl("1"),
    isAnswer4Correct: new FormControl(false),
    answerOption5Text: new FormControl(null),
    answerOption5MediaUrl: new FormControl(null),
    answerOption5MediaType: new FormControl("1"),
    isAnswer5Correct: new FormControl(false),
    answerOption6Text: new FormControl(null),
    answerOption6MediaUrl: new FormControl(null),
    answerOption6MediaType: new FormControl("1"),
    isAnswer6Correct: new FormControl(false),
    categoryId: new FormControl(null),
    lessonId: new FormControl(null),
  });
}
