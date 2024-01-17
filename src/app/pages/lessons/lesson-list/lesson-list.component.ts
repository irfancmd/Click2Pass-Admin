import { Component, OnInit } from "@angular/core";
import { LessonService } from "../services/lesson.service";

@Component({
  selector: "ngx-lesson-list",
  templateUrl: "./lesson-list.component.html",
  styleUrls: ["./lesson-list.component.scss"],
})
export class LessonListComponent implements OnInit {
  lessons: any[];

  constructor(private lessonService: LessonService) {}

  ngOnInit(): void {
    this.lessonService.getLessons().subscribe((data: any) => {
      this.lessons = data.data;
    });
  }
}
