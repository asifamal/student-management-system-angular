import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentserviceService } from '../services/studentservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editstudent',
  templateUrl: './editstudent.component.html',
  styleUrl: './editstudent.component.css'
})
export class EditstudentComponent implements OnInit {
  constructor(private form: FormBuilder, private studentService: StudentserviceService, private router: Router) { }

  studentForm!: FormGroup


  ngOnInit(): void {
    this.studentForm = this.form.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      email: ['', Validators.required, Validators.required],
      address: this.form.group({
        street: ['', Validators.required],
        state: ['', Validators.required],
        city: ['', Validators.required],
        pincode: ['', Validators.required]
      }),
      subject: ['', Validators.required],
      previousSchool: this.form.array([])
    });
    console.log(this.studentService.currentStudent)
    this.studentForm.patchValue({
      firstName: this.studentService.currentStudent.firstName,
      lastName: this.studentService.currentStudent.lastName,
      email: this.studentService.currentStudent.email,
      subject: this.studentService.currentStudent.subject,
    })

    this.studentForm.get('address')?.patchValue({
        street: this.studentService.currentStudent.address.street,
        state: this.studentService.currentStudent.address.state,
        city: this.studentService.currentStudent.address.city,
        pincode: this.studentService.currentStudent.address.pincode
      })
    }

    
    
    
  onUpdateStudent(studentData: any) {
    if (this.studentForm.valid) {
      this.studentService.updateStudent(this.studentService.currentStudentId, studentData)
        .subscribe((res) => {
          this.router.navigate(['/home'])
        })
    }
    }
  }



