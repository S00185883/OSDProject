import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { List } from 'src/app/list';

@Injectable({
  providedIn: 'root'
})
export class ListsService {

  private readonly apiBaseUrl = 'https://5c6716e624e2140014f9ee66.mockapi.io/lists';

  constructor(private http: HttpClient) { }


  index() {
    return this.http.get<List[]>(`${this.apiBaseUrl}/lists`);
  }


  create(list: List) {
    return this.http.post<List>(`${this.apiBaseUrl}/lists`, list);
  }


  remove(id) {
    return this.http.delete(`${this.apiBaseUrl}/lists/${id}`);
  }

  setCompleted(id: string, isCompleted: boolean) {
    return this.http.put<List>(`${this.apiBaseUrl}/lists/${id}`, {isCompleted});

  }

}