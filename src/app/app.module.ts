import { ShowPipe } from './auth-component/secure-root/depense/depense-items/depense-liste/show.pipe';
import { DepenseListeComponent } from './auth-component/secure-root/depense/depense-items/depense-liste/depense-liste.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AProposComponent } from './a-propos/a-propos.component';
import { NotreEquipeComponent } from './notre-equipe/notre-equipe.component';
import { ContactComponent } from './contact/contact.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccueilComponent } from './accueil/accueil.component';
import { SignupComponent } from './auth-component/signup/signup.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { LoginComponent } from './auth-component/login/login.component';
import { DashboardComponent } from './auth-component/secure-root/dashboard/dashboard.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { SideMenuComponent } from './auth-component/side-menu/side-menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashStatestiqueComponent } from './auth-component/secure-root/dashboard/dash-items/dash-statestique/dash-statestique.component';
import { DashDepensesComponent } from './auth-component/secure-root/dashboard/dash-items/dash-depenses/dash-depenses.component';
import { DashRevenusComponent } from './auth-component/secure-root/dashboard/dash-items/dash-revenus/dash-revenus.component';
import { CategorieComponent } from './auth-component/secure-root/categorie/categorie.component';
import { CatDepComponent } from './auth-component/secure-root/categorie/cat-items/cat-dep/cat-dep.component';
import { CategorieDepComponent } from './auth-component/secure-root/categorie/cat-items/cat-dep/categorie-dep/categorie-dep.component';
import { SousCategorieDepComponent } from './auth-component/secure-root/categorie/cat-items/cat-dep/sous-categorie-dep/sous-categorie-dep.component';
import { CatRevComponent } from './auth-component/secure-root/categorie/cat-items/cat-rev/cat-rev.component';
import { ToastrModule } from 'ngx-toastr';
import { DepenseComponent } from './auth-component/secure-root/depense/depense.component';
import { DepenseStatComponent } from './auth-component/secure-root/depense/depense-items/depense-stat/depense-stat.component';
import { DataTablesModule } from 'angular-datatables';
import { RevenuComponent } from './auth-component/secure-root/revenu/revenu.component';
import { RevenuListComponent } from './auth-component/secure-root/revenu/revenu-items/revenu-list/revenu-list.component';
import { RevenuStatComponent } from './auth-component/secure-root/revenu/revenu-items/revenu-stat/revenu-stat.component';

@NgModule({
  declarations: [
    AppComponent,
    AProposComponent,
    NotreEquipeComponent,
    ContactComponent,
    AccueilComponent,
    SignupComponent,
    LoginComponent,
    DashboardComponent,
    MenuComponent,
    FooterComponent,
    SideMenuComponent,
    DashStatestiqueComponent,
    DashDepensesComponent,
    DashRevenusComponent,
    CategorieComponent,
    CatDepComponent,
    CategorieDepComponent,
    SousCategorieDepComponent,
    CatRevComponent,
    DepenseComponent,
    DepenseStatComponent,
    DepenseListeComponent,
    ShowPipe,
    RevenuComponent,
    RevenuListComponent,
    RevenuStatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    SweetAlert2Module.forRoot(),
    LoadingBarModule,
    LoadingBarHttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    DataTablesModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
