import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class HttpService {
  private apiUrl = environment.API_URL;

  constructor(private http: HttpClient) { }

  public get<T>(url: string): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${url}`);
  }

  post<T, D>(url: string, data: D): Observable<T> {
    console.log(JSON.stringify(data))
    return this.http.post<T>(`${this.apiUrl}/${url}`, data);
  }

}
