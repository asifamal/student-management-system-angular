import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../models/student.model';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentserviceService {

  currentStudent: any;
  currentStudentId: any;

  constructor(private http: HttpClient) { }

  // url = "https://task-management-3ce9a-default-rtdb.asia-southeast1.firebasedatabase.app/students.json"
  private apiUrl = 'http://127.0.0.1:8000/students/create/';

  
  


  createStudent(studentData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'

    });
    const transformedData = {
      first_name: studentData.firstName,
      last_name: studentData.lastName,
      date_of_birth: studentData.dateOfBirth,
      email: studentData.email,
      street: studentData.address.street,
      city: studentData.address.city,
      state: studentData.address.state,
      pincode: studentData.address.pincode,
      subjects: studentData.subjects
    };

    return this.http.post(this.apiUrl, transformedData, { headers: headers });
  }

  getStudent() {
    return this.http.get<any>('http://127.0.0.1:8000/students/').pipe(
      map((response) => {
        let students: Student[] = [];
        for (let key in response) {
          if (response.hasOwnProperty(key)) {
            let studentData = response[key];
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
            };
            students.push(student);
          }
        }
        return students;
      })
    );
  }
  
  

  getStudentById(id:number){
    return this.http.get(`http://127.0.0.1:8000/students/${id}/`)
  }

  updateStudent(id:string | undefined, Stddata:any){
    const transformedData = {
      first_name: Stddata.firstName,
      last_name: Stddata.lastName,
      date_of_birth: Stddata.dateOfBirth,
      email: Stddata.email,
      street: Stddata.address.street,
      city: Stddata.address.city,
      state: Stddata.address.state,
      pincode: Stddata.address.pincode,
      subjects: Stddata.subjects
    };
    return this.http.put(`http://127.0.0.1:8000/students/edit/${id}/`,transformedData)
  }

  deleteStudent(id:string | undefined){
    return this.http.delete(`http://127.0.0.1:8000/students/${id}/delete/`)  
  }
































}