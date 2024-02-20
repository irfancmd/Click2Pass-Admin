import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CategoryService } from "../../categories/services/category.service";
import { CurriculumService } from "../../curriculum/services/curriculum.service";
import { Router } from "@angular/router";

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
  public curriculumSelectItems: any[] = [];

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
    numberOfOptionsVisible: new FormControl(4), // Not being used
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
    chapterId: new FormControl("0"),
    lessonId: new FormControl("0"),
    curriculumId: new FormControl("0"),
  });

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private categoryService: CategoryService,
    private curriculumService: CurriculumService
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

    this.curriculumService.getCurriculums().subscribe((data: any) => {
      if (data.data) {
        this.curriculumSelectItems = data.data.map((curriculum: any) => {
          return {
            value: curriculum.id,
            text: curriculum.name,
          };
        });
      }
    });
  }

  onSubmit() {
    if (this.isFormValid()) {
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

      if (this.questionForm.controls.chapterId.value != "0") {
        this.questionForm.controls.curriculumId.setValue(null);
      } else if (this.questionForm.controls.curriculumId.value != "0") {
        this.questionForm.controls.chapterId.setValue(null);
      }

      if (this.questionForm.controls.lessonId.value == "0") {
        this.questionForm.controls.lessonId.setValue(null);
      }

      this.httpClient
        .post("http://localhost:3000/question", this.questionForm.value)
        .subscribe(() => {
          this.router.navigate(["/pages/questions"]);
        });
    }
  }

  private isFormValid(): boolean {
    if (!this.questionForm.controls.questionText.value.trim()) {
      return false;
    }

    if (
      this.hasQuestionMedia &&
      !this.questionForm.controls.questionMediaUrl.value.trim()
    ) {
      return false;
    }

    if (
      this.isMultipleChoice &&
      this.questionForm.controls.numberOfOptionsVisible.value < 2
    ) {
      return false;
    }

    if (
      !(
        this.questionForm.controls.isAnswer1Correct.value ||
        this.questionForm.controls.isAnswer2Correct.value ||
        this.questionForm.controls.isAnswer3Correct.value ||
        this.questionForm.controls.isAnswer4Correct.value ||
        this.questionForm.controls.isAnswer5Correct.value ||
        this.questionForm.controls.isAnswer6Correct.value
      )
    ) {
      return false;
    }

    for (
      let i = 1;
      i <= this.questionForm.controls.numberOfOptionsVisible.value;
      i++
    ) {
      if (
        !(
          this.questionForm.get(`answerOption${i}Text`) &&
          this.questionForm.controls[`answerOption${i}Text`].value.trim()
        )
      ) {
        return false;
      }
    }

    if (
      this.questionForm.controls.chapterId.value != "0" &&
      this.questionForm.controls.curriculumId.value != "0"
    ) {
      return false;
    }

    return true;
  }
}
