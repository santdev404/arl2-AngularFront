import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { UserService } from '../../services/user.service';
import { Post } from '../../models/post';
import {PostService} from '../../services/post.services';
import {global} from '../../services/global';


@Component({
  selector: 'app-post-new',
  templateUrl: './post-new.component.html',
  styleUrls: ['./post-new.component.css'],
  providers: [UserService, CategoryService, PostService]
})
export class PostNewComponent implements OnInit {

  public page_title: string;
  public identity: any;
  public token: any;
  public post: Post;

  public categories: any;

  public status: any;

  public url: any;

  public afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png, .gif, .jpeg",
    maxSize: "500",
    uploadAPI:  {
      url: global.url+'post/upload',
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
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _categoryService: CategoryService,
    private _postService: PostService

  ) { 
    this.page_title = "Post new";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();

    this.post = new Post(1,this.identity.sub,1,'','','','');
  }

  ngOnInit(): void {
    console.log(this.post);
    this.getCategories();
  }

  onSubmit(form:any){
    console.log(this.post);
    this._postService.create(this.token, this.post).subscribe(
      response => {
        if(response.status == 'success'){
          this.post = response.post;
          this.status = 'success';
          this._router.navigate(['/inicio']);
        }else{
          this.status = 'error';
        }
      }, error =>{
        console.log(error);
        this.status = 'error';
      }
    );
    
  }

  getCategories(){
    this._categoryService.getCategories().subscribe(
      response => {
        if(response.status == 'success'){
          this.categories = response.categories;
          console.log(this.categories);
        }
      }, error => {
        console.log(error);
      }
    );
  }

  imageUpload(datos:any){
    let image_data = JSON.parse(datos.response);
    this.post.image = image_data.image;
  }


}
