import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class CurriculumService {
  constructor(private httpClient: HttpClient) {}

  getCurriculums() {
    return this.httpClient.get("http://localhost:3000/curriculum");
  }

  createCurriculum(curriculum: any) {
    return this.httpClient.post("http://localhost:3000/curriculum", curriculum);
  }
}
