import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Subscription, switchMap } from 'rxjs';
import { UserModel } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnDestroy, OnInit {
  private _user$!: Subscription;

  public user!: UserModel;

  constructor(private _route: ActivatedRoute, private _userService: UsersService) { }
  
  ngOnDestroy(): void {
    this._user$.unsubscribe();
  }

  ngOnInit(): void {
    this._user$ = this._route.paramMap.pipe(
      map(param => param.get('id') as string),
      switchMap(id => this._userService.getUserById(+id))
    ).subscribe(user => this.user = user);
  }

}
