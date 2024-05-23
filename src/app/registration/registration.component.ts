import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentserviceService } from '../services/studentservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {


  constructor(private form: FormBuilder, private studentService: StudentserviceService, private router: Router){}

  studentForm!: FormGroup;

  ngOnInit(): void {
    this.studentForm = this.form.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      email: ['',Validators.email],
      address: this.form.group({
        street: ['', Validators.required],
        state: ['', Validators.required],
        city: ['', Validators.required],
        pincode: ['', Validators.required]
      }),
      subject: ['', Validators.required],
      previousSchool: this.form.array([])
    });
  }

  get previousSchool() {
    return this.studentForm.get('previousSchool') as FormArray;
  }

  onSubmit(data: any){  
    if (this.studentForm.valid) {
      this.studentService.createStudent(data).subscribe((res) => {
        console.log(res);
        this.router.navigate(['/home'])
      });
    }

  }

  addSchool(){
    const previousSchooling = this.form.group({
      schoolName: ['', Validators.required],
      startYear: ['', Validators.required],
      endYear: ['', Validators.required]
    });
    this.previousSchool.push(previousSchooling);

  }

  removeSchool(index: number){
    this.previousSchool.removeAt(index);
  }
}
