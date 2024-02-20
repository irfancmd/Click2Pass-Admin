import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class CategoryService {
  private API_ENDPOINT = "http://localhost:3000/chapter";
  constructor(private httpClient: HttpClient) {}

  getCategories() {
    return this.httpClient.get(`${this.API_ENDPOINT}`);
  }

  createCategory(category: any) {
    return this.httpClient.post(`${this.API_ENDPOINT}`, category);
  }

  updateCategory(categoryId, category: any) {
    return this.httpClient.put(`${this.API_ENDPOINT}/${categoryId}`, category);
  }

  removeCategory(categoryId) {
    return this.httpClient.delete(`${this.API_ENDPOINT}/${categoryId}`);
  }
}
