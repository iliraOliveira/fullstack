import { JsonPipe } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { StudentsServices } from '../../services/students.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-student-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css'],
})
export class StudentFormComponent implements OnInit, OnDestroy {

  form!: FormGroup;
  studentFormSubscription!: Subscription;
  paramsSubscription!: Subscription;
  studentService = inject(StudentsServices);
  isEditMode: boolean = false;

  constructor(private fb: FormBuilder, private activatedRouter: ActivatedRoute, private router: Router) {

  }
  ngOnDestroy(): void {
    if (this.studentFormSubscription) {
      this.studentFormSubscription.unsubscribe();
    }
    if (this.paramsSubscription) {
      this.paramsSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    
    this.paramsSubscription = this.activatedRouter.params.subscribe(
      {
        next: (response) => {
          console.log('Route params:', response['id']);
          let studentId = response['id'];
          if (!studentId) {
            return;
          }
          this.studentService.getStudentById(studentId).subscribe({
            next: (studentData) => {
              this.form.patchValue(studentData);
              this.isEditMode = true;
            },
            error: (error) => {
              console.error('Error retrieving student data:', error);
            }
          });
        },
        error: (error) => {
          console.error('Error retrieving route params:', error);
        }
      }
    )

    this.form = this.fb.group({
      name: ['', Validators.required],
      address: [],
      phoneNumber: ['', Validators.pattern(/^\(?[1-9]{2}\)? ?(?:[2-8]|9[0-9])[0-9]{3}\-?[0-9]{4}$/)],
      email: ['', Validators.email],
    });
  }

  onSubmit(): void {
    this.studentFormSubscription = this.studentService.addStudent(this.form.value).subscribe({
      next: (response) => {
        console.log('Student added successfully:', response);
        this.router.navigateByUrl('/students');
      },
      error: (error) => {
        console.error('Error adding student:', error);
      }
    });
  }


}
