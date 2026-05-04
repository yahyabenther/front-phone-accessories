import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';

const API_URL = 'http://localhost:8081/api/categories';

@Injectable({ providedIn: 'root' })
export class CategoryService {

  constructor(private http: HttpClient) {}

  // GET /api/categories (toutes les catégories)
  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(API_URL);
  }

  // GET /api/categories/{id}
  getById(id: number): Observable<Category> {
    return this.http.get<Category>(`${API_URL}/${id}`);
  }

  // POST /api/categories
  create(category: Category): Observable<Category> {
    return this.http.post<Category>(API_URL, category);
  }

  // PUT /api/categories/{id}
  update(id: number, category: Category): Observable<Category> {
    return this.http.put<Category>(`${API_URL}/${id}`, category);
  }

  // DELETE /api/categories/{id}
  delete(id: number): Observable<any> {
    return this.http.delete(`${API_URL}/${id}`);
  }
}