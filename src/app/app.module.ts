import { NgModule } from '@angular/core';
import { BrowserModule} from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { HttpClientModule } from '@angular/common/http';
import { ListstudentComponent } from './liststudent/liststudent.component';
import { EditstudentComponent } from './editstudent/editstudent.component';
import { ViewstudentComponent } from './viewstudent/viewstudent.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    ListstudentComponent,
    EditstudentComponent,
    ViewstudentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
