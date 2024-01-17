import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class LessonService {
  constructor(private httpClient: HttpClient) {}

  getLessons() {
    return this.httpClient.get("http://localhost:3000/lesson");
  }

  createLesson(lesson: any) {
    return this.httpClient.post("http://localhost:3000/lesson", lesson);
  }
}
