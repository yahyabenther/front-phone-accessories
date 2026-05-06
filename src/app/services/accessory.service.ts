import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Accessory } from '../models/accessory.model';

const API_URL = '/api/accessories';

@Injectable({
  providedIn: 'root'
})
export class AccessoryService {

  constructor(private http: HttpClient) {}

  // GET ALL
  getAll(): Observable<Accessory[]> {
    return this.http.get<Accessory[]>(API_URL);
  }

  // CREATE
  create(accessory: Accessory): Observable<Accessory> {
    return this.http.post<Accessory>(API_URL, accessory);
  }

  // UPDATE
  update(
    id: number,
    accessory: Accessory,
    categoryId: number,
    brandId: number
  ): Observable<Accessory> {
    return this.http.put<Accessory>(
      `${API_URL}/${id}?categoryId=${categoryId}&brandId=${brandId}`,
      accessory
    );
  }

  // DELETE 
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${API_URL}/${id}`);
  }

  // FILTER 
  filter(categoryId?: number, brandId?: number): Observable<Accessory[]> {
    let url = API_URL;

    const params = [];
    if (categoryId) params.push(`categoryId=${categoryId}`);
    if (brandId) params.push(`brandId=${brandId}`);

    if (params.length) {
      url += '?' + params.join('&');
    }

    return this.http.get<Accessory[]>(url);
  }
}