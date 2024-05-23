import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentserviceService } from '../services/studentservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editstudent',
  templateUrl: './editstudent.component.html',
  styleUrls: ['./editstudent.component.css']
})
export class EditstudentComponent implements OnInit {
  studentForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private studentService: StudentserviceService, private router: Router) { }

  ngOnInit(): void {
    this.initForm();
    this.populateForm();
  }

  initForm(): void {
    this.studentForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: this.formBuilder.group({
        street: ['', Validators.required],
        state: ['', Validators.required],
        city: ['', Validators.required],
        pincode: ['', Validators.required]
      }),
      subjects: this.formBuilder.array([], Validators.required),
      previousSchool: this.formBuilder.array([])
    });
  }

  populateForm(): void {
    const currentStudent = this.studentService.currentStudent;
    if (currentStudent) {
      this.studentForm.patchValue({
        firstName: currentStudent.firstName,
        lastName: currentStudent.lastName,
        email: currentStudent.email,
        dateOfBirth: currentStudent.dateOfBirth,
        subject: currentStudent.subject
      });

      this.studentForm.get('address')?.patchValue({
        street: currentStudent.address.street,
        state: currentStudent.address.state,
        city: currentStudent.address.city,
        pincode: currentStudent.address.pincode
      });

      if (currentStudent.previousSchool) {
        currentStudent.previousSchool.forEach((school: any) => {
          this.previousSchoolControls.push(this.formBuilder.group({
            schoolName: [school.schoolName],
            startYear: [school.startYear],
            endYear: [school.endYear]
          }));
        });
      }
    }
  }
  onCheckboxChange(event: any): void {
    const subjects: FormArray = this.studentForm.get('subjects') as FormArray;

    if (event.target.checked) {
      subjects.push(this.formBuilder.control(event.target.value));
    } else {
      const index = subjects.controls.findIndex(x => x.value === event.target.value);
      subjects.removeAt(index);
    }
  }

  get f() {
    return this.studentForm.controls;
  }

  get previousSchoolControls(): FormArray {
    return this.studentForm.get('previousSchool') as FormArray;
  }

  addPreviousSchool(): void {
    this.previousSchoolControls.push(this.formBuilder.group({
      schoolName: [''],
      startYear: [''],
      endYear: ['']
    }));
  }

  removeSchool(index: number): void {
    this.previousSchoolControls.removeAt(index);
  }

  onUpdateStudent(): void {
    if (this.studentForm.valid) {
      this.studentService.updateStudent(this.studentService.currentStudentId, this.studentForm.value)
        .subscribe(() => {
          this.router.navigate(['/home']);
        });
    }
  }
}
