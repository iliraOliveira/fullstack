import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student } from '../types/student';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentsServices {
  
  apiUrl:string="http://localhost:5287/api/student";
  
  constructor(private http: HttpClient) { }

  getStudents=():Observable<Student[]>=>this.http.get<Student[]>(this.apiUrl);
  addStudent = (data: Student) => this.http.post<Student>(this.apiUrl, data);
  getStudentById = (id: number): Observable<Student> => this.http.get<Student>(`${this.apiUrl}/${id}`);
  updateStudent = (id: number, data: Student) => this.http.put<Student>(`${this.apiUrl}/${id}`, data)

}
