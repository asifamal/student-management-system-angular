import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../models/student.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentserviceService {

  currentStudent: any;
  currentStudentId: any;

  constructor(private http: HttpClient) { }

  url = "https://task-management-3ce9a-default-rtdb.asia-southeast1.firebasedatabase.app/students.json"

  createStudent(studentData: any) {
    return this.http.post(this.url, studentData)
  }

  getStudent() {
    return this.http.get<{ [key: string]: Student }>(this.url).pipe(map((response) => {
      let student = [];
      for (let key in response) {
        if (response.hasOwnProperty(key)) {
          student.push({ ...response[key], id: key })
        }
      }
      return student;
    }))
  }

  getStudentById(id:number){
    return this.http.get<Student>('https://task-management-3ce9a-default-rtdb.asia-southeast1.firebasedatabase.app/students/'+id+'.json')
  }

  updateStudent(id:string | undefined, student: Student){
    return this.http.put('https://task-management-3ce9a-default-rtdb.asia-southeast1.firebasedatabase.app/students/'+id+'.json', student)
  }

  deleteStudent(id:string | undefined){
    return this.http.delete('https://task-management-3ce9a-default-rtdb.asia-southeast1.firebasedatabase.app/students/'+id+'.json')
  }








































}
