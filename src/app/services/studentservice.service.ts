import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../models/student.model';
import { Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentserviceService {

  currentStudent: any;
  currentStudentId: any;

  constructor(private http: HttpClient) { }


  private apiUrl = 'http://127.0.0.1:8000/students/create/';
  private apiUrl2 = 'http://127.0.0.1:8000';





  createStudent(studentData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });


    const { firstName, lastName, dateOfBirth, email, address, subjects, previousSchool } = studentData;


    const transformedData = {
      first_name: firstName,
      last_name: lastName,
      date_of_birth: dateOfBirth,
      email: email,
      street: address.street,
      city: address.city,
      state: address.state,
      pincode: address.pincode,
      subjects: subjects,
      previous_schooling: previousSchool.map((school: any) => ({
        school_name: school.schoolName,
        start_year: school.startYear,
        end_year: school.endYear
      }))
    };

    return this.http.post(this.apiUrl, transformedData, { headers: headers });
  }

  checkEmailExists(email: string): Observable<boolean> {
    return this.http.get<any>(`${this.apiUrl2}/check-email/?email=${email}`, { params: { email } }).pipe(
      map(response => response.exists)
    );
  }
  

  getStudent() {
  return this.http.get<any>('http://127.0.0.1:8000/students/').pipe(
    map((response) => {
      let students: Student[] = [];
      for (let key in response) {
        if (response.hasOwnProperty(key)) {
          let studentData = response[key];
          let previousSchoolData = studentData.previous_schooling.map((school: any) => ({
            schoolName: school.school_name,
            startYear: school.start_year,
            endYear: school.end_year
          }));
          let student: Student = {
            id: studentData.id,
            firstName: studentData.first_name,
            lastName: studentData.last_name,
            email: studentData.email,
            dateOfBirth: studentData.date_of_birth,
            address: {
              street: studentData.street,
              state: studentData.state,
              city: studentData.city,
              pincode: studentData.pincode
            },
            subject: studentData.subjects,
            previousSchool: previousSchoolData
          };
          students.push(student);
        }
      }
      return students;
    })
  );
}




getStudentById(id: number): Observable<Student> {
  return this.http.get<Student>(`http://127.0.0.1:8000/students/${id}/`).pipe(
    tap((student: Student) => {
      this.currentStudent = student;
      console.log('Fetched student:', this.currentStudent);
    })
  );
}
  

  updateStudent(id: string | undefined, studentData: any) {
    const { firstName, lastName, dateOfBirth, email, address, subjects, previousSchool } = studentData;

    const transformedData = {
      first_name: firstName,
      last_name: lastName,
      date_of_birth: dateOfBirth,
      email: email,
      street: address.street,
      city: address.city,
      state: address.state,
      pincode: address.pincode,
      subjects: subjects,
      previous_schooling: previousSchool.map((school: any) => ({
        school_name: school.schoolName,
        start_year: school.startYear,
        end_year: school.endYear
      }))
    };

    return this.http.put(`http://127.0.0.1:8000/students/edit/${id}/`, transformedData);
  }

  deleteStudent(id: string | undefined) {
    return this.http.delete(`http://127.0.0.1:8000/students/${id}/delete/`)
  }
  
































}