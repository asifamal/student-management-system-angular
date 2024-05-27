import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { StudentserviceService } from '../services/studentservice.service';
import { Router } from '@angular/router';
import { Student } from '../models/student.model';

@Component({
  selector: 'app-editstudent',
  templateUrl: './editstudent.component.html',
  styleUrls: ['./editstudent.component.css']
})
export class EditstudentComponent implements OnInit {
  studentForm!: FormGroup;
  emailTaken = false;


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
        pincode: ['', [Validators.required, Validators.pattern(/^[1-9][0-9]{5}$/)]]
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
      });

      this.studentForm.get('address')?.patchValue({
        street: currentStudent.address.street,
        state: currentStudent.address.state,
        city: currentStudent.address.city,
        pincode: currentStudent.address.pincode
      });


      console.log('Current Student Subjects:', currentStudent.subject);

      if (currentStudent.previousSchool.length > 0) {
        const previousSchools = this.formBuilder.array(
          currentStudent.previousSchool.map((school: any) =>
            this.formBuilder.group({
              schoolName: [school.schoolName, Validators.required],
              startYear: [school.startYear, Validators.required],
              endYear: [school.endYear, Validators.required]
            })
          )
        ) as FormArray;
        this.studentForm.setControl('previousSchool', previousSchools);
      }

      // Populate subjects
      const subjects = this.studentForm.get('subjects') as FormArray;
      currentStudent.subject.forEach((subject: string) => {
        subjects.push(new FormControl(subject));
      });

      console.log('Subjects FormArray:', subjects.value);
    } 
  }

  onCheckboxChange(event: any, subject: string): void {
    const subjects: FormArray = this.studentForm.get('subjects') as FormArray;

    if (event.target.checked) {
      subjects.push(new FormControl(subject));
    } else {
      const index = subjects.controls.findIndex((control: AbstractControl) => control.value === subject);
      if (index !== -1) {
        subjects.removeAt(index);
      }
    }
  }

  isSubjectSelected(subject: string): boolean {
    const subjects: FormArray = this.studentForm.get('subjects') as FormArray;
    return subjects.value.includes(subject);
  }

  get f() {
    return this.studentForm.controls;
  }

  get previousSchoolControls(): FormArray {
    return this.studentForm.get('previousSchool') as FormArray;
  }

  addSchool() {
    const previousSchooling = this.formBuilder.group({
      schoolName: ['', Validators.required],
      startYear: ['', Validators.required],
      endYear: ['', Validators.required]
    });
    this.previousSchoolControls.push(previousSchooling);
  }

  isValidDateFormat(date: string): boolean {
    const regex = /^\d{2}-\d{2}-\d{4}$/;
    return regex.test(date);
  }

  removeSchool(index: number) {
    this.previousSchoolControls.removeAt(index);
  }

  onUpdateStudent(): void {
    if (this.studentForm.valid) {
      const updatedStudent: Student = {
        id: this.studentService.currentStudentId,
        ...this.studentForm.value
      };
      this.studentService.updateStudent(this.studentService.currentStudentId, updatedStudent)
        .subscribe(() => {
          this.router.navigate(['/home']);
        });
    } else {
      this.studentForm.markAllAsTouched();
    }
  }
}
