import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AgmCoreModule } from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './components/security/auth.guard';
import { SharedService } from './services/shared.service';
import { SpinnerService } from './services/spinner.service';
import { OverlayModule } from '@angular/cdk/overlay';
import { UserService } from './services/usuario/usuario.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AlocacaoService } from './services/alocacao/alocacao.service';
import { EmpresaService } from './services/empresa/empresa.service';
import { PessoaService } from './services/pessoa/pessoa.service';
import { FatorService } from './services/fatores/fator.service';
import { ConfigService } from './services/config/config.service';
import { MedicaoService } from './services/medicao/medicao.service';
import { FatorMedidoService } from './services/medicao/fator.medido.service';
import { GamificacaoService } from './services/gamificacao/gamificacao.service';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    OverlayModule,
    MatSnackBarModule,
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    })
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent
  ],
  providers: [
    AuthGuard,
    SharedService,
    SpinnerService,
    UserService,
    AlocacaoService,
    EmpresaService,
    PessoaService,
    FatorService,
    ConfigService,
    MedicaoService,
    FatorMedidoService,
    GamificacaoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
