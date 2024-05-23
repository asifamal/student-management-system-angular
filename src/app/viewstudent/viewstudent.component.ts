import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentserviceService } from '../services/studentservice.service';

@Component({
  selector: 'app-viewstudent',
  templateUrl: './viewstudent.component.html',
  styleUrl: './viewstudent.component.css'
})
export class ViewstudentComponent implements OnInit {

  student: any
  studId: any

  constructor(private route: ActivatedRoute,private studentService: StudentserviceService, private router: Router){}

  ngOnInit(): void {
     this.studId = this.route.snapshot.params['id']
    console.log(this.studId)
    this.fetchView(this.studId)
  }

  fetchView(id: any){
    this.studentService.getStudentById(id).subscribe((res) => {
      this.student = res
    })
  }

  goHome(){
    this.router.navigate(['home'])
  }

}
