
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Brand } from '../models/Brand.model';

@Injectable({
  providedIn: 'root',
})
export class BrandService {

 
  constructor(private http: HttpClient) {}
 
  getAll(): Observable<Brand[]> {
    return this.http.get<Brand[]>('/api/brands');
  }
 
  getById(id: number): Observable<Brand> {
    return this.http.get<Brand>(`/api/brands/${id}`);
  }
 
  create(brand: Brand): Observable<Brand> {
    return this.http.post<Brand>( '/api/brands', brand);
  }
 
  update(id: number, brand: Brand): Observable<Brand> {
    return this.http.put<Brand>(`/api/brands/${id}`, brand);
  }
 
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`/api/brands/${id}`);
  }





  
}
