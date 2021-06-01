import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  public page_title: string;
  public user: User;
  public status: string;
  public token: any;
  public identity: any;

  public isToken: any;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ) { 
    this.page_title = "Identificate";
    this.user = new User(1, '', '', 'ROLE_USER', '', '', '', '');
    this.status = "";
  }

  ngOnInit(): void {
    //Se ejecuta siempre y cierra sesion solo cuando le llega el parametro sure por la url
    this.logout();
  }

  onSubmit(form:any){

    this.isToken = true; //Variable true

    this._userService.signUp(this.user).subscribe(
      response => {
        //token
        if(response.status != 'error'){
          this.status = 'success';
          this.token = response;

          //Objeto usuario identificado
          this._userService.signUp(this.user, this.isToken).subscribe(
            response => {
              
               this.identity = response;
               console.log(this.token);
               console.log(this.identity);

               //Almacena la informacion en el local storage
               localStorage.setItem('token', this.token);
               localStorage.setItem('identity', JSON.stringify(this.identity)); //transforma un obj json para ser compatible en el localStorage


              //Redireccion a inicio
              this._router.navigate(['inicio']);

 
            },
            error => {
              this.status = "error";
              console.log(<any>error);
            }
          );



        }else{
          this.status = 'error';
          
        }
      },
      error => {
        this.status = "error";
        console.log(<any>error);
      }
    );
  }


  logout(){
    this._route.params.subscribe(params=>{
      let logout = +params['sure']; //string que se cambia a un entero agregandole signo + (Castear)

      if(logout == 1){
        localStorage.removeItem('identity');
        localStorage.removeItem('token');

        this.identity = null;
        this.token = null;

        //Redireccion a inicio
        this._router.navigate(['inicio']);

      }
    });
  }

}
