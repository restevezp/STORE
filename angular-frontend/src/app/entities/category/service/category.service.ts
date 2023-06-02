import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../model/category.model';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  public getAllCategories(partialName?: string): Observable<Category[]>{

    let urlEndpoint: string = "http://localhost:8080/store/categories";
    if (partialName) {
      urlEndpoint = urlEndpoint + "?partialName=" + partialName;
    }
    return this.http.get<Category[]>(urlEndpoint);
  }




  //nuevo

  public getCategoryById(categoryId: number): Observable<Category> {
    const urlEndpoint: string = `http://localhost:8080/store/categories/${categoryId}`;
    return this.http.get<Category>(urlEndpoint);
  }

  public insertCategory(category: Category): Observable<Category> {
    const urlEndpoint: string = 'http://localhost:8080/store/categories';
    return this.http.post<Category>(urlEndpoint, category);
  }







//nuevo

  public updateCategory(category: Category): Observable<Category> {
    const urlEndpoint: string = `http://localhost:8080/store/categories/${category.id}`;
    return this.http.put<Category>(urlEndpoint, category);
  }

  public deleteCategory(categoryId: number): Observable<void> {
    const urlEndpoint: string = `http://localhost:8080/store/categories/${categoryId}`;
    return this.http.delete<void>(urlEndpoint);
  }
}
