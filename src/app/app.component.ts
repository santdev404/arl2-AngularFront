import { Component, OnInit, DoCheck } from '@angular/core';
import {UserService} from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements OnInit, DoCheck{
  title = 'bAngular';
  public identity: any;
  public token: any;

  constructor(
    public _userService: UserService
  ){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit(){
    console.log('Webapp cargada correctamente');
  }

  ngDoCheck(){
    this.loadUser();
  }


  loadUser(){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }


}
