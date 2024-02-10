import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CategoryService } from "../../categories/services/category.service";

@Component({
  selector: "ngx-question-form",
  templateUrl: "./question-form.component.html",
  styleUrls: ["./question-form.component.scss"],
})
export class QuestionFormComponent implements OnInit {
  public hasQuestionMedia = false;
  public isMultipleChoice = true;
  public hasAnswerWithMedia = false;

  public categorySelectItems: any[] = [];

  public previewQuestionText = "";
  public previewMediaUrl = "";
  public previewAnswerOption1Text = "";
  public previewAnswerOption2Text = "";
  public previewAnswerOption3Text = "";
  public previewAnswerOption4Text = "";
  public previewAnswerOption5Text = "";
  public previewAnswerOption6Text = "";

  public questionForm = new FormGroup({
    questionText: new FormControl("", [Validators.required]),
    questionMediaUrl: new FormControl(null),
    questionMediaType: new FormControl("1"),
    numberOfOptionsVisible: new FormControl(6), // Not being used
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
    categoryId: new FormControl("0"),
    // lessonId: new FormControl("0"),
  });

  constructor(
    private httpClient: HttpClient,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.questionForm.valueChanges.subscribe((data) => {
      this.previewQuestionText = data.questionText;
      this.previewMediaUrl = data.questionMediaUrl;
      this.previewAnswerOption1Text = data.answerOption1Text;
      this.previewAnswerOption2Text = data.answerOption2Text;
      this.previewAnswerOption3Text = data.answerOption3Text;
      this.previewAnswerOption4Text = data.answerOption4Text;
      this.previewAnswerOption5Text = data.answerOption5Text;
      this.previewAnswerOption6Text = data.answerOption6Text;
    });

    this.categoryService.getCategories().subscribe((data: any) => {
      if (data.data) {
        this.categorySelectItems = data.data.map((category: any) => {
          return {
            value: category.id,
            text: category.name,
          };
        });
      }
    });
  }

  onSubmit() {
    const correctAnswerArray = [];

    if (this.questionForm.controls.isAnswer1Correct.value) {
      correctAnswerArray.push(1);
    }

    if (this.questionForm.controls.isAnswer2Correct.value) {
      correctAnswerArray.push(2);
    }

    if (this.questionForm.controls.isAnswer3Correct.value) {
      correctAnswerArray.push(3);
    }

    if (this.questionForm.controls.isAnswer4Correct.value) {
      correctAnswerArray.push(4);
    }

    if (this.questionForm.controls.isAnswer5Correct.value) {
      correctAnswerArray.push(5);
    }

    if (this.questionForm.controls.isAnswer6Correct.value) {
      correctAnswerArray.push(6);
    }

    const correctAnswerText = correctAnswerArray.join(",");

    this.questionForm.controls.correctAnswerText.setValue(correctAnswerText);

    this.httpClient
      .post("http://localhost:3000/question", this.questionForm.value)
      .subscribe((data) => {
        console.log(data);
      });
  }
}
