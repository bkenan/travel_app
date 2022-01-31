import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // added import
import { RouterModule, Routes } from '@angular/router'; //added routes
import { AppComponent } from './app.component';
import { TravelListComponent } from './travel-list/travel-list.component';
import { DestinationComponent } from './destination/destination.component';
import { TravelViewComponent } from './travel-view/travel-view.component';

const routes: Routes = [
  { path: '', redirectTo: '/travel-list', pathMatch: 'full'},
  { path: 'travel-list', component: TravelListComponent },
  { path: 'travel-view/:id', component: TravelViewComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    TravelListComponent,
    DestinationComponent,
    TravelViewComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,   // added to imports
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
