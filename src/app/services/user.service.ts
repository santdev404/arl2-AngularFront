import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/user';
import {global} from './global';

@Injectable()
export class UserService{
    public url: string;
    constructor(
        public _http: HttpClient
    ){
        this.url = global.url;
    }

    test(){
        return "Hello there from a service";
    }

    register(user: User): Observable<any>{

        //Stringify convierte el obj(User) en json string
        let json =  JSON.stringify(user);
        let params = 'json='+json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.post(this.url+'register',params,{headers: headers});
    }
}