import { Component, OnInit } from "@angular/core";
import { CurriculumService } from "../services/curriculum.service";

@Component({
  selector: "ngx-curriculum-list",
  templateUrl: "./curriculum-list.component.html",
  styleUrls: ["./curriculum-list.component.scss"],
})
export class CurriculumListComponent implements OnInit {
  curriculums: any[];

  constructor(private curriculumService: CurriculumService) {}

  ngOnInit(): void {
    this.curriculumService.getCurriculums().subscribe((data: any) => {
      this.curriculums = data.data;
    });
  }
}
