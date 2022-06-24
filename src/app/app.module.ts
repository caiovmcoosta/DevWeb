import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatriculaDetailComponent } from './matricula-detail/matricula-detail.component';
import { MatriculasComponent } from './matriculas/matriculas.component';
import { MatriculaSearchComponent } from './matricula-search/matricula-search.component';
import { MessagesComponent } from './messages/messages.component';



@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule, 
    HttpClientModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    MatriculasComponent,
    MatriculaDetailComponent,
    MessagesComponent,
    MatriculaSearchComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
