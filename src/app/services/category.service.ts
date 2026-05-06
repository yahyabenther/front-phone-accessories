import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Category } from '../models/category.model';

const API_URL = '/api/categories';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) {}

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(API_URL);
  }

  getById(id: number): Observable<Category> {
    return this.http.get<Category>(`${API_URL}/${id}`);
  }

  create(category: Category): Observable<Category> {
    return this.http.post<Category>(API_URL, category);
  }

  update(id: number, category: Category): Observable<Category> {
    return this.http.put<Category>(`${API_URL}/${id}`, category);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${API_URL}/${id}`);
  }
}