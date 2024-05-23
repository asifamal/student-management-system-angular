import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { StudentserviceService } from '../services/studentservice.service';
import { Student } from '../models/student.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-liststudent',
  templateUrl: './liststudent.component.html',
  styleUrl: './liststudent.component.css'
})
export class ListstudentComponent implements OnInit {
  studentListFromService: Student[] = []

  constructor(private http: HttpClient, private studentService: StudentserviceService, private router: Router){}

  ngOnInit(): void {
    this.studentService.getStudent().subscribe((students) => {
      console.log(students)
      this.studentListFromService = students
    })
  }

  onEditClicked(id?:string){
    let currentStd = this.studentListFromService.find((p) => {
      return p.id === id;
    })
      this.studentService.currentStudent = currentStd
      this.studentService.currentStudentId = id
      this.router.navigate(['edit', id])
    }

    onViewClick(id: any){
      this.router.navigate(['view', id])
    }

    OnDeleteClicked(id:any){
      this.studentService.deleteStudent(id).subscribe((res)=> {
        this.studentService.getStudent().subscribe((students)=> {
          this.studentListFromService = students
        })
        this.router.navigate(['/home'])
      })
    }
    













    
  }


