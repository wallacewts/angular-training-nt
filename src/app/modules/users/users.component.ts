import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public dataList: any = [];

  constructor(
    public router: Router,
    public userService: UsersService
    ) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void{
    this.userService.getAll().then(res => {
      this.dataList = res;
    })
  }

  deleteItem(id: any): void {
    this.userService
      .delete({id: id})
      .then(() => {
        this.loadUsers()
      })
      .catch((rej: any) => {
      })
      .finally(() => {
      });
  }

  edit(id: any): void {
    this.router.navigateByUrl(`usuarios/${id}`)
  }
}
