import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentserviceService } from '../services/studentservice.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  studentForm!: FormGroup;
  emailTaken = false;

  constructor(private form: FormBuilder, private studentService: StudentserviceService, private router: Router) { }

  ngOnInit(): void {
    this.studentForm = this.form.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: this.form.group({
        street: ['', Validators.required],
        state: ['', Validators.required],
        city: ['', Validators.required],
        pincode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]]
      }),
      subjects: this.form.array([], Validators.required),
      previousSchool: this.form.array([])
    });
  }

  get f() {
    return this.studentForm.controls;
  }

  get previousSchool() {
    return this.studentForm.get('previousSchool') as FormArray;
  }

  get subjects() {
    return this.studentForm.get('subjects') as FormArray;
  }

  onSubmit(data: any) {
    if (this.studentForm.valid) {
      this.studentService.createStudent(data).subscribe(
        (res) => {
          console.log(res);
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Student registration successful!',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            this.router.navigate(['/home']);
          });
        },
        (error) => {
          console.error(error);
          this.emailTaken = true;
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Email is already taken!',
          });
        }
      );
    } else {
      this.markFormGroupTouched(this.studentForm);
    }
  }

  addSchool() {
    const previousSchooling = this.form.group({
      schoolName: ['', Validators.required],
      startYear: ['', Validators.required],
      endYear: ['', Validators.required]
    });
    this.previousSchool.push(previousSchooling);
  }

  removeSchool(index: number) {
    this.previousSchool.removeAt(index);
  }

  onSubjectChange(event: any) {
    const subjects = this.subjects;
    if (event.target.checked) {
      subjects.push(this.form.control(event.target.value));
    } else {
      const index = subjects.controls.findIndex(x => x.value === event.target.value);
      subjects.removeAt(index);
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
    });
  }
}
