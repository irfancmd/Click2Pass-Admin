import { Component, OnInit } from "@angular/core";
import { QuestionSetService } from "../services/question-set.service";
import { QuestionService } from "../../questions/services/question.service";
import { Router } from "@angular/router";

@Component({
  selector: "ngx-question-set-list",
  templateUrl: "./question-set-list.component.html",
  styleUrls: ["./question-set-list.component.scss"],
})
export class QuestionSetListComponent implements OnInit {
  public questionSets: any[] = [];

  constructor(
    private questionSetService: QuestionSetService,
    private questionService: QuestionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.questionSetService.getQuestionSets().subscribe((data: any) => {
      if (data.data) {
        this.questionSets = data.data;
      }
    });
  }

  onClickEdit(id: number) {
    this.router.navigate(["/pages/question-set-form", id]);
  }

  onClickDelete(id: number) {
    this.questionSetService.remove(id).subscribe(() => {
      this.questionSets = this.questionSets.filter((e) => e.id != id);
    });
  }
}
