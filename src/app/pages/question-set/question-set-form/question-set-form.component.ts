import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { QuestionSetService } from "../services/question-set.service";
import { CategoryService } from "../../categories/services/category.service";
import { QuestionService } from "../../questions/services/question.service";

@Component({
  selector: "ngx-question-set-form",
  templateUrl: "./question-set-form.component.html",
  styleUrls: ["./question-set-form.component.scss"],
})
export class QuestionSetFormComponent implements OnInit {
  public questionSetForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
    description: new FormControl(""),
  });

  public questions: any[] = [];

  public categorySelectItems: any[] = [];

  public selectedCategoryModel: string = "0";

  public selectedQuestionIds: number[] = [];

  constructor(
    private questionSetService: QuestionSetService,
    private categoryService: CategoryService,
    private questionService: QuestionService
  ) {}

  ngOnInit(): void {
    this.questionService.getQuestions().subscribe((data: any) => {
      this.questions = data.data;
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
    if (this.selectedQuestionIds.length > 0) {
      this.questionSetService
        .createQuestionSets({
          ...this.questionSetForm.value,
          questionIds: this.selectedQuestionIds,
        })
        .subscribe();
    }
  }

  onChangeCheckBox(event: any, questionId: number) {
    if (event.target.checked) {
      this.selectedQuestionIds.push(questionId);
    } else {
      this.selectedQuestionIds = this.selectedQuestionIds.filter(
        (q) => q != questionId
      );
    }

    console.log(this.selectedQuestionIds);
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

  onChangeCategorySelection(event: any) {
    if (event == "0") {
      this.questionService.getQuestions().subscribe((data: any) => {
        this.questions = data.data;
      });
    } else {
      this.questionService.getQuestions().subscribe((data: any) => {
        this.questions = data.data.filter((q) => q.categoryId == event);
      });
    }
  }

  isQuestionSelected(questionId: number) {
    return this.selectedQuestionIds.includes(questionId);
  }
}
