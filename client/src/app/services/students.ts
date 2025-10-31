import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student } from '../types/student';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentsServices {
  constructor(private http: HttpClient) { }
  getStudents=():Observable<Student[]>=>this.http.get<Student[]>("http://localhost:5287/api/student");
}
