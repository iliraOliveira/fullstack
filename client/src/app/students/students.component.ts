import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../types/student';
import { StudentsServices } from '../services/students.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-students',
  imports: [AsyncPipe, CommonModule, RouterLink],
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent implements OnInit {

  students$!: Observable<Student[]>;
  toastService = inject(ToastrService);
  studentServices = inject(StudentsServices);

  ngOnInit(): void {
    this.getStudents();
  }

  deleteStudent(id: number) {
    this.studentServices.deleteStudent(id).subscribe({
      next: (response) => {
        this.toastService.success('Student deleted successfully', 'Success');
        this.getStudents();
      },
      error: (err) => {
        this.toastService.error('Failed to delete student', 'Error');
        console.error(err);
      }
    });
  }
  private getStudents():void {
    this.students$ = this.studentServices.getStudents();
  } 
}
