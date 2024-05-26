import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { QuestionSetService } from "../services/question-set.service";
import { CategoryService } from "../../categories/services/category.service";
import { QuestionService } from "../../questions/services/question.service";
import { CurriculumService } from "../../curriculum/services/curriculum.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "ngx-question-set-form",
  templateUrl: "./question-set-form.component.html",
  styleUrls: ["./question-set-form.component.scss"],
})
export class QuestionSetFormComponent implements OnInit {
  public questionSetForm = new FormGroup({
    name: new FormControl("", [Validators.required]),
    description: new FormControl(""),
    numOfQuestions: new FormControl(20),
    curriculumId: new FormControl(
      window.localStorage.getItem("qsf-selectedCurriculumId") ?? "0"
    ),
  });

  public questionSearch = new FormGroup({
    searchText: new FormControl(null),
    chapterId: new FormControl(
      window.localStorage.getItem("qsf-selectedChapterId") ?? "0"
    ),
  });

  public questions: any[] = [];

  public IMG_ROOT = "https://click2pass.ca/uploads/";
  public chapterSelectItems: any[] = [];
  public chapterSelectItemsViewable: any[] = [];
  public curriculumSelectItems: any[] = [];

  public selectedCategoryModel: string = "0";

  public selectedQuestionIds: number[] = [];

  public questionSetToBeUpdated: any;

  constructor(
    private questionSetService: QuestionSetService,
    private curriculumService: CurriculumService,
    private categoryService: CategoryService,
    private questionService: QuestionService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const questionSetId = this.activatedRoute.snapshot.params["id"];

    if (questionSetId) {
      this.questionSetService
        .getQuestionSetById(questionSetId)
        .subscribe((data: any) => {
          this.questionSetToBeUpdated = data.data;
          this.selectedQuestionIds = this.questionSetToBeUpdated.questions.map(
            (q) => q.id
          );

          this.questionSetForm.patchValue({
            name: this.questionSetToBeUpdated.name,
            description: this.questionSetToBeUpdated.description,
            curriculumId: this.questionSetToBeUpdated.curriculumId,
            numOfQuestions: this.selectedQuestionIds.length,
          });
        });
    }

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

    this.categoryService.getCategories().subscribe((data: any) => {
      if (data.data) {
        this.chapterSelectItems = data.data.map((category: any) => {
          return {
            value: category.id,
            text: category.name,
            curriculumId: category.curriculumId,
          };
        });

        let curriculumId = this.questionSetForm.controls.curriculumId.value;

        if (curriculumId != "0") {
          this.chapterSelectItemsViewable = this.chapterSelectItems.filter(
            (categorySelectItem) =>
              categorySelectItem.curriculumId == curriculumId
          );
        } else {
          this.chapterSelectItemsViewable = this.chapterSelectItems;
        }
      }
    });

    this.questionSetForm.controls.curriculumId.valueChanges.subscribe(
      (curriculumId) => {
        this.chapterSelectItemsViewable = this.chapterSelectItems.filter(
          (categorySelectItem) =>
            categorySelectItem.curriculumId == curriculumId
        );
        window.localStorage.setItem("qsf-selectedCurriculumId", curriculumId);

        // Clear selected questoin ids when curriculum selection is changed
        this.selectedQuestionIds = [];

        // Re-populate questions of that curriculum
        this.questionService.getQuestions().subscribe((data: any) => {
          let questionList = data.data;

          this.questions = questionList.filter(q => q.curriculumId == curriculumId);
        });
      }
    );

    this.questionSearch.controls.chapterId.valueChanges.subscribe(
      (chapterId) => {
        window.localStorage.setItem("qsf-selectedChapterId", chapterId);
      }
    );

    this.onSearch();
  }

  onSubmit() {
    const countDiff =
      this.selectedQuestionIds.length -
      this.questionSetForm.controls.numOfQuestions.value;
    if (countDiff > 0) {
      alert(
        `You have exceeded the question set limit by ${Math.abs(
          countDiff
        )} questions. Please deselect extra questions.`
      );
      return;
    } else if (countDiff < 0) {
      alert(`Please select ${Math.abs(countDiff)} more questions.`);
      return;
    }

    if (this.selectedQuestionIds.length > 0) {
      if (!this.questionSetToBeUpdated) {
        // Create
        this.questionSetService
          .createQuestionSets({
            ...this.questionSetForm.value,
            questionIds: this.selectedQuestionIds,
          })
          .subscribe(() => {
            this.router.navigate(["/pages/question-set"]);
          });
      } else {
        this.questionSetService
          .update(this.questionSetToBeUpdated.id, {
            ...this.questionSetForm.value,
            questionIds: this.selectedQuestionIds,
          })
          .subscribe(() => {
            this.router.navigate(["/pages/question-set"]);
          });
      }
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

  onSearch() {
    this.questionService.getQuestions().subscribe((data: any) => {
      let questionList = data.data;

      let searchText = this.questionSearch.controls.searchText.value;
      let curriculumId = this.questionSetForm.controls.curriculumId.value;
      let chapterId = this.questionSearch.controls.chapterId.value;

      if (searchText) {
        questionList = questionList.filter((e) =>
          e.questionText.toLowerCase().includes(searchText.toLowerCase())
        );
      }

      if (curriculumId && curriculumId != "0") {
        questionList = questionList.filter(
          (e) => e.curriculumId == curriculumId
        );
      }

      if (chapterId && chapterId != "0") {
        questionList = questionList.filter((e) => e.chapterId == chapterId);
      }

      this.questions = questionList;
    });
  }
}
