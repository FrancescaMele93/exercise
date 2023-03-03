import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';

const routes: Routes = [{
  component: HomepageComponent,
  path: ''
}, {
  component: PostDetailComponent,
  path: 'post/:id'
}, {
  component: UserDetailComponent,
  path: 'user/:id'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
