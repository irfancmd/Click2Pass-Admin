import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CategoryService {
  constructor(private httpClient: HttpClient) {}

  getCategories() {
    return this.httpClient.get("http://localhost:3000/category");
  }

  createCategory(category: any) {
    return this.httpClient.post("http://localhost:3000/category", category);
  }

  tempGetCategories() {
    return of(
      { 
      data: [
        {
          id: 1,
          name: "Category A"
        },
        {
          id: 2,
          name: "Category B"
        },
        {
          id: 3,
          name: "Category C"
        },
    ]
  });
  }
}
