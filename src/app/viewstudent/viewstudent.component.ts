import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentserviceService } from '../services/studentservice.service';

@Component({
  selector: 'app-viewstudent',
  templateUrl: './viewstudent.component.html',
  styleUrl: './viewstudent.component.css'
})
export class ViewstudentComponent implements OnInit {

  student: any = undefined
  studId: any

  constructor(private route: ActivatedRoute,private studentService: StudentserviceService, private router: Router){}

  ngOnInit(): void {
     this.studId = this.route.snapshot.params['id']
    console.log(this.studId)
    this.fetchView(this.studId)
  }

  fetchView(id: any){
    this.studentService.getStudentById(id).subscribe((res) => {
      console.log(res)
      this.student = res
    })
  }

  formatDate(dateString: string): string {
    if (!dateString) {
      return ''; 
    }
    
    const [year, month, day] = dateString.split('-');
    return `${day}-${month}-${year}`;
  }

  goHome(){
    this.router.navigate(['home'])
  }

}
