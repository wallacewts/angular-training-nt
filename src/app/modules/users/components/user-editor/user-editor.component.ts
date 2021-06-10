import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-editor',
  templateUrl: './user-editor.component.html',
  styleUrls: ['./user-editor.component.scss']
})
export class UserEditorComponent implements OnInit {
  public form: FormGroup;
  private id: any;
  private data: any;

  constructor(
    public activateRoute: ActivatedRoute,
    public router: Router,
    public service: UsersService
  ) {
    this.activateRoute.params.subscribe(params => {
      if (params.id) {
        this.id = params?.id;
        this.loadData();
      }
    });

    this.form = new FormGroup({
      name: new FormControl(null, [Validators.maxLength(255), Validators.minLength(3)]),
      email: new FormControl(null, [Validators.maxLength(255), Validators.minLength(3)]),
      cpf: new FormControl(null, [Validators.maxLength(14), Validators.minLength(14)]),
      password: new FormControl(null, [Validators.maxLength(10), Validators.minLength(3)])
    });
  }

  ngOnInit(): void {
  }

  save(): void {
    if (!this.id) {
      this.createItem();
    } else {
      this.editItem();
    }
  }

  loadData(): void {
    this.service.getOne({id: this.id}).then(res => {
      this.data = res;
      this.form.patchValue(res);
    })
  }

  createItem(): void {
    let requestObject = {
      name: this.form?.value?.name,
      cpf: +this.form?.value?.cpf?.replaceAll('.', '').replace('-', ''),
      email: this.form?.value?.email,
      password: this.form?.value?.password,
    }

    this.service
      .create(requestObject)
      .then(res => {
        this.router.navigate(['../'], { relativeTo: this.activateRoute });
      })
      .catch((rej: any) => {
      })
      .finally(() => {
      });
  }

  editItem(): void {
    let requestObject = {
      name: this.form?.value?.name,
      cpf: +this.form?.value?.cpf?.replaceAll('.', '').replace('-', ''),
      email: this.form?.value?.email,
      password: this.form?.value?.password,
    }

    this.service
      .edit(this.id, requestObject)
      .then(() => {
        this.router.navigate(['../'], { relativeTo: this.activateRoute });
      })
      .catch((rej: any) => {
      })
      .finally(() => {
      });
  }

  cancelEdition(): void {
    this.router.navigate(['../'], { relativeTo: this.activateRoute });
  }

}
