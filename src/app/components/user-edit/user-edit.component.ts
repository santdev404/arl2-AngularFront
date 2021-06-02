import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';

import {global} from '../../services/global';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserService]
})
export class UserEditComponent implements OnInit {

  public page_title: string;
  public user: User;
  public status: any;

  public identity: any;
  public token: any;
  public url: any;

  public afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png, .gif. jpeg",
    maxSize: "50",
    uploadAPI:  {
      url: global.url+'user/upload',
      method:"POST",
      headers: {
      "Authorization" : this._userService.getToken()
      },
      params: {
        'page': '1'
      },
      responseType: 'blob',
    },
    theme: "attachPin",
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,
    attachPinText: 'Sube tu avatar de usuario'

};

  constructor(
    private _userService: UserService


  ) { 
    this.page_title = "Ajustes de usuario";
    this.user = new User(1, '', '', 'ROLE_USER', '', '', '', '');
    this.status = "";
    this.url = global.url;

    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();

    //Rellenar el objeto usuario
    this.user = new User(
      this.identity.sub, 
      this.identity.name, 
      this.identity.surname, 
      this.identity.role, 
      this.identity.email, '', 
      this.identity.description, 
      this.identity.image);

  }

  ngOnInit(): void {
    
  }

  onSubmit(form:any){
    this._userService.update(this.token, this.user).subscribe(
      response => {
        if(response.status && response.status){
          this.status = 'success';
          console.log(response);
          //actualizar usuario en sesion

          if(response.change.name){
            this.user.name = response.change.name;
          }

          if(response.change.surname){
            this.user.surname = response.change.surname;
          }

          if(response.change.email){
            this.user.email = response.change.email;
          }

          if(response.change.description){
            this.user.description = response.change.description;
          }

          if(response.change.image){
            this.user.image = response.change.image;
          }
          
          this.identity = this.user;
          localStorage.setItem('identity', JSON.stringify(this.identity));

        }else{
          this.status = 'error';
        }
      },
      error =>{
        this.status = 'error';
        console.log(<any>error);
      }
    );
  }

  avatarUpload(datos:any){
    let data = JSON.parse(datos.response);
    this.user.image = data.image;
  }

}
