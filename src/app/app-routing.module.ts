import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { ListstudentComponent } from './liststudent/liststudent.component';
import { EditstudentComponent } from './editstudent/editstudent.component';
import { ViewstudentComponent } from './viewstudent/viewstudent.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'home', component: ListstudentComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'edit/:id', component: EditstudentComponent },
  { path: 'view/:id', component: ViewstudentComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full', },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
