import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { StudentserviceService } from '../services/studentservice.service';
import { Student } from '../models/student.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-liststudent',
  templateUrl: './liststudent.component.html',
  styleUrls: ['./liststudent.component.css']
})
export class ListstudentComponent implements OnInit {
  studentListFromService: Student[] = [];
  filteredStudents: Student[] = [];
  searchQuery: string = '';

  constructor(private http: HttpClient, private studentService: StudentserviceService, private router: Router) {}

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents() {
    this.studentService.getStudent().subscribe((students) => {
      console.log(students);
      this.studentListFromService = students;
      this.filteredStudents = students; 
    });
  }

  onEditClicked(id?: string) {
    let currentStd = this.studentListFromService.find((p) => p.id === id);
    this.studentService.currentStudent = currentStd;
    this.studentService.currentStudentId = id;
    this.router.navigate(['edit', id]);
  }

  onViewClick(id: any) {
    this.router.navigate(['view', id]);
  }
  onDeleteClicked(id: any) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.studentService.deleteStudent(id).subscribe((res: any) => {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          }).then(() => {
            this.getStudents(); 
            this.router.navigate(['/home']);
          });
        });
      }
    });
  }
  filterStudents() {
    if (!this.searchQuery.trim()) {
      this.filteredStudents = this.studentListFromService;
    } else {
      const query = this.searchQuery.toLowerCase();
      this.filteredStudents = this.studentListFromService.filter(
        (student) =>
          student.firstName.toLowerCase().includes(query) ||
          student.lastName.toLowerCase().includes(query) ||
          student.email.toLowerCase().includes(query)
      );
    }
  }
}


