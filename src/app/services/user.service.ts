import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/user';
import {global} from './global';

@Injectable()
export class UserService{
    public url: string;
    public indentity:any;
    public token:any;



    constructor(
        public _http: HttpClient
    ){
        this.url = global.url;
    }


    register(user: User): Observable<any>{

        //Stringify convierte el obj(User) en json string
        let json =  JSON.stringify(user);
        let params = 'json='+json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.post(this.url+'register',params,{headers: headers});
    }


    signUp(user:any, gettoken = null): Observable<any>{

        if(gettoken != null){
            user.gettoken = 'true';
        }

        //Stringify convierte el obj(User) en json string
        let json =  JSON.stringify(user);
        let params = 'json='+json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.post(this.url+'login',params,{headers: headers});
    }

    getIdentity(){

        let identity = JSON.parse(localStorage.getItem('identity') || '{}');

        if(identity && identity != 'undefined'){
            this.indentity = identity;
        }else{
            this.indentity = null;
        }

        return this.indentity;
    }

    getToken(){

        let token = localStorage.getItem('token');

        if(token && token != "undefined"){
            this.token = token;
        }else{
            this.token = null;
        }

        return this.token;

    }
}