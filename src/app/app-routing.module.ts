import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PessoasComponent } from './pessoas/pessoas.component';
import { AeroportosComponent } from './aeroportos/aeroportos.component';


const routes: Routes = [
  {
    path: 'pessoas',
    component: PessoasComponent
  },
  {
    path: 'aeroportos',
    component: AeroportosComponent
  },
  { path: '',
    redirectTo: '/pessoas',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
