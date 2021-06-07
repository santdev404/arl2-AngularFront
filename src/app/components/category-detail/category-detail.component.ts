import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {UserService} from '../../services/user.service';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import {global} from '../../services/global';
import {PostService} from '../../services/post.services';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css'],
  providers: [UserService, CategoryService, PostService]
})
export class CategoryDetailComponent implements OnInit {
  public page_title: string;
  public category: Category;
  public posts:any;
  public url;

  public identity: any;
  public token: any;


  constructor(
    private _postService: PostService,
    private _categoryService: CategoryService,
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { 
    this.page_title = 'New category';
    this.category = new Category(1, '');
    this.url = global.url;

    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit(): void {
    this.getPostsByCategory();
  }

  getPostsByCategory(){
    this._route.params.subscribe(
      params=>{
        let id = params.id

        this._categoryService.getCategory(id).subscribe( response =>{
          if(response.status == 'success'){
            this.category = response.category;

            this._categoryService.getPostByCate(id).subscribe(
              response=>{
                this.posts = response.posts
              },error=>{
                console.log(error);
              }
            );


          }
          else{
            this._router.navigate(['/inicio']);
          }
        }, error => {
          console.log(error);
        });
         
        

      }
    );
  }


  deletePost(id:any){
    this._postService.delete(this.token, id).subscribe(
      response => {
        this.getPostsByCategory();
      }, error =>{
        console.log(error);
      }
    );
  }


}
