import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { StudentserviceService } from '../services/studentservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  studentForm!: FormGroup;
  emailTaken = false;
  states!: any[];
  cities!: any[];
  selectedState!: any;

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
    this.cities =[]
    this.loadStates();
  }

  get f() {
    return this.studentForm.controls;
  }

  get previousSchool() {
    return this.studentForm.get('previousSchool') as FormArray;
  }

  onCheckboxChange(event: any): void {
    const subjects: FormArray = this.studentForm.get('subjects') as FormArray;

    if (event.target.checked) {
      subjects.push(this.form.control(event.target.value));
    } else {
      const index = subjects.controls.findIndex(x => x.value === event.target.value);
      subjects.removeAt(index);
    }
  }

  onSubmit(data: any) {
    if (this.studentForm.valid) {
      this.studentService.createStudent(data).subscribe(
        (res) => {
          console.log(res);
          this.router.navigate(['/home']);
        },
        (error) => {
          console.error(error);
          this.emailTaken = true;
        }
      );
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

  loadStates() {
    this.studentService.getStates().subscribe(data => {
      this.states = data;
    });
  }

  onStateChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    let stateId =Number(selectElement.value) ;
    console.log(stateId);
 
    this.studentService.getCities(stateId).subscribe(data => {
      this.cities = data;
    });
  }
}
