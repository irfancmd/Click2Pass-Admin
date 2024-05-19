import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class CategoryService {
  // private API_ENDPOINT = "http://localhost:3000/chapter";
  private API_ENDPOINT = "https://click2pass.ca:3000/chapter";
  constructor(private httpClient: HttpClient) {}

  getCategories() {
    return this.httpClient.get(`${this.API_ENDPOINT}`);
  }

  getById(id: number) {
    return this.httpClient.get(`${this.API_ENDPOINT}/${id}`);
  }

  createCategory(category: any) {
    return this.httpClient.post(`${this.API_ENDPOINT}`, category);
  }

  updateCategory(categoryId, category: any) {
    return this.httpClient.patch(
      `${this.API_ENDPOINT}/${categoryId}`,
      category
    );
  }

  removeCategory(categoryId) {
    return this.httpClient.delete(`${this.API_ENDPOINT}/${categoryId}`);
  }
}
