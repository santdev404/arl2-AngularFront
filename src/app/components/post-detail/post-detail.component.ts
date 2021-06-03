import { Component, OnInit } from '@angular/core';
import {Post} from '../../models/post';
import {PostService} from '../../services/post.services';
import {global} from '../../services/global';
import {UserService} from '../../services/user.service';

import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
  providers: [PostService, UserService]
})
export class PostDetailComponent implements OnInit {
  public page_title: string;
  public url:any;
  public post: any;
  public status: any;

  public identity: any;
  public token: any;

  constructor(
    private _postService: PostService,
    private _userService: UserService,

    private _route: ActivatedRoute,
    private _router: Router
  ) { 
    this.page_title = "Post data";
  }

  ngOnInit(): void {
    this.getPost();
  }

  getPost(){
    //Sacar el id del post url
    this._route.params.subscribe(params=>{
      let id = +params['id'];
      console.log(id);

      //Peticion ajax para sacar los datos del post
      this._postService.getPost(id).subscribe(
        response =>{
          if(response.status == 'success'){
            this.post = response.post;
            console.log(this.post);
          }else{
            //this._router.navigate(['inicio']);
          }
        },error=>{
          console.log(error);
          this._router.navigate(['inicio']);
        }
      );

    })

  }

}
