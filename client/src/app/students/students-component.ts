import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../types/student';
import { StudentsServices } from '../services/students';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-students',
  imports: [AsyncPipe, CommonModule],
  templateUrl: './students.html',
  styleUrl: './students.css',
})
export class Students implements OnInit {

  students$!: Observable<Student[]>;
  studentService = inject(StudentsServices);
  ngOnInit(): void {
    this.students$=this.studentService.getStudents();
  }
}
