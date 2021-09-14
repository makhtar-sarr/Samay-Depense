import { DepenseShowComponent } from './auth-component/secure-root/depense/depense-items/depense-show/depense-show.component';
import { RevenuShowComponent } from './auth-component/secure-root/revenu/revenu-items/revenu-show/revenu-show.component';
import { RevenuResolver } from './auth-component/secure-root/revenu/revenu.resolver';
import { RevenuComponent } from './auth-component/secure-root/revenu/revenu.component';
import { DepenseResolver } from './auth-component/secure-root/depense/depense.resolver';
import { CategorieResolver } from './auth-component/secure-root/categorie/categorie.resolver';
import { DepenseComponent } from './auth-component/secure-root/depense/depense.component';
import { CategorieComponent } from './auth-component/secure-root/categorie/categorie.component';
import { NotreEquipeComponent } from './notre-equipe/notre-equipe.component';
import { ContactComponent } from './contact/contact.component';
import { AProposComponent } from './a-propos/a-propos.component';
import { DashboardComponent } from './auth-component/secure-root/dashboard/dashboard.component';
import { LoginComponent } from './auth-component/login/login.component';
import { SignupComponent } from './auth-component/signup/signup.component';
import { AccueilComponent } from './accueil/accueil.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'accueil', component: AccueilComponent },
  { path: 'apropos', component: AProposComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'equipe', component: NotreEquipeComponent },
  { path: 'signup', component: SignupComponent },
  { path: '',   redirectTo: '/accueil', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'categorie', component: CategorieComponent, resolve: {categories: CategorieResolver} },
  { path: 'depense', component: DepenseComponent, resolve: {depenses: DepenseResolver} },
  { path: 'revenu', component: RevenuComponent, resolve: {revenus: RevenuResolver}},
  { path: 'revenu/:id', component: RevenuShowComponent},
  { path: 'depense/:id', component: DepenseShowComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
