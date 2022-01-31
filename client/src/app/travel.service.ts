import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TravelService {

  apiurl: string = environment.apiurl;

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get(`${this.apiurl}/travel/`);
  }

  create(data) {
    return this.http.post(`${this.apiurl}/travel`, data);
  }

  read(id) {
    return this.http.get(`${this.apiurl}/travel/${id}`);
  }

  update(id, data) {
    return this.http.put(`${this.apiurl}/travel/${id}`, data);
  }

  delete(id) {
    return this.http.delete(`${this.apiurl}/travel/${id}`);
  }
}