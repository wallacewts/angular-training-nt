import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserEditorComponent } from './components/user-editor/user-editor.component';
import { UsersComponent } from './users.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    children: []
  },
  {
    path: 'novo',
    component: UserEditorComponent,
    children: []
  },
  {
    path: ':id',
    component: UserEditorComponent,
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
