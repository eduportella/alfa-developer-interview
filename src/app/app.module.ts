import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AeroportosComponent } from './aeroportos/aeroportos.component';
import { PessoasComponent } from './pessoas/pessoas.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PessoasService } from './services/pessoas.service';
import { AeroportosService } from './services/aeroportos.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    AeroportosComponent,
    PessoasComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule

  ],
  providers: [PessoasService, AeroportosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
