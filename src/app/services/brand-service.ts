import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Brand } from '../models/Brand.model';

const API_URL = '/api/brands';

@Injectable({
  providedIn: 'root',
})
export class BrandService {

  constructor(private http: HttpClient) {}

  getAll(): Observable<Brand[]> {
    return this.http.get<Brand[]>(API_URL);
  }

  getById(id: number): Observable<Brand> {
    return this.http.get<Brand>(`${API_URL}/${id}`);
  }

  create(brand: Brand): Observable<Brand> {
    return this.http.post<Brand>(API_URL, brand);
  }

  update(id: number, brand: Brand): Observable<Brand> {
    return this.http.put<Brand>(`${API_URL}/${id}`, brand);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${API_URL}/${id}`);
  }
}