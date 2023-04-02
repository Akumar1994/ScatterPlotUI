import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
  })
  export class DataService {
    private baseUrl = apiServerUrl+'coordinates';
  
    constructor(private http: HttpClient) { }
  
    uploadCsvFile(file: File): Observable<any> {
      const formData: FormData = new FormData();
      formData.append('file', file, file.name);
      const headers = new HttpHeaders();
      headers.append('Content-Type', 'multipart/form-data');
      headers.append('Accept', 'application/json');
      return this.http.post(`${this.baseUrl}`, formData, { headers: headers });
    }
  
    getAllDataPoints(): Observable<any> {
      return this.http.get(`${this.baseUrl}`);
    }
    clearThePlot(): Observable<any> {
       return this.http.delete(`${this.baseUrl}`);
    }
  }