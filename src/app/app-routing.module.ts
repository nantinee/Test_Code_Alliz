import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailComponent } from './component/detail/detail.component';
import { ThempnalsComponent } from './component/thempnals/thempnals.component';

const routes: Routes = [
  { path:'', component:ThempnalsComponent},
  { path: 'detaile', component:DetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
