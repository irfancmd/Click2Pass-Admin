import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class CategoryService {
  constructor(private httpClient: HttpClient) {}

  getCategories() {
    return this.httpClient.get("http://localhost:3000/chapter");
  }

  createCategory(category: any) {
    return this.httpClient.post("http://localhost:3000/chapter", category);
  }
}
