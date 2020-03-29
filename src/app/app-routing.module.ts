import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './auth/auth.guard';
import {HomepageComponent} from './components/pages/homepage/homepage.component';
import {CoronaClusterCountComponent} from './components/pages/datacollection/corona-cluster-count/corona-cluster-count.component';
// import { ProfileComponent } from './pages/profile/profile.component';
// import {LoginComponent} from './pages/login/login.component';
// import {StudentsignupComponent} from './pages/studentsignup/studentsignup.component';
const routes: Routes = [
  {
    path: 'home',
    component: HomepageComponent
  }, {
    path: 'corona-cluster-count',
    component: CoronaClusterCountComponent
  }, {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
