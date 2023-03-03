import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { PostComponent } from './components/post/post.component';
import { PostCardComponent } from './components/post-card/post-card.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { FilterDataPipe } from './pipes/filter-data.pipe';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    PostCardComponent,
    PostDetailComponent,
    UserDetailComponent,
    HomepageComponent,
    FilterDataPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
