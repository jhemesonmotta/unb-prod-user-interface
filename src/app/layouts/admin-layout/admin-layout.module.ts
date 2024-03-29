import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../components/dashboard/dashboard.component';
import { UserProfileComponent } from '../../components/user-profile/user-profile.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { AddAlocacaoComponent } from 'app/components/alocacao/add-alocacao/add-alocacao.component';
import { ListarEmpresasComponent } from 'app/components/empresa/listar-empresas/listar-empresas.component';
import { ListarUsuariosComponent } from '../../components/usuarios/listar-usuarios/listar-usuarios.component';
import { CriarEmpresaComponent } from 'app/components/empresa/criar-empresa/criar-empresa.component';
import { CriarUsuarioComponent } from 'app/components/usuarios/criar-usuario/criar-usuario.component';
import { VisualizarEmpresaComponent } from '../../components/empresa/visualizar-empresa/visualizar-empresa.component';
import { AddAlocacaoEmpresaComponent } from 'app/components/alocacao/add-alocacao-empresa/add-alocacao-empresa.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ListarFatoresComponent } from 'app/components/fatores/listar-fatores/listar-fatores.component';
import { AddFatorComponent } from 'app/components/fatores/add-fator/add-fator.component';
import { AddConfiguracaoComponent } from 'app/components/configuracao/add-configuracao/add-configuracao.component';
import { ListarConfiguracoesComponent } from 'app/components/configuracao/listar-configuracoes/listar-configuracoes.component';
import { EditConfiguracaoComponent } from 'app/components/configuracao/edit-configuracao/edit-configuracao.component';
import { ListarMedicoesComponent } from 'app/components/medicao/listar-medicoes/listar-medicoes.component';
import { VerMedicaoComponent } from 'app/components/medicao/ver-medicao/ver-medicao.component';
import { CriarMedicaoComponent } from 'app/components/medicao/criar-medicao/criar-medicao.component';
import { VerMedicaoPessoaComponent } from 'app/components/medicao/ver-medicao-pessoa/ver-medicao-pessoa.component';
import { EditarMedicaoPessoaComponent } from 'app/components/medicao/editar-medicao-pessoa/editar-medicao-pessoa.component';
import { DynamicFormComponent } from 'app/components/medicao/partials/dynamic-form/dynamic-form.component';
import { DynamicFormQuestionComponent } from 'app/components/medicao/partials/dynamic-form-question/dynamic-form-question.component';
import { SalaTrofeusComponent } from 'app/components/sala-trofeus/sala-trofeus.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatAutocompleteModule,
    ReactiveFormsModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    AddAlocacaoComponent,
    ListarEmpresasComponent,
    ListarUsuariosComponent,
    CriarEmpresaComponent,
    CriarUsuarioComponent,
    VisualizarEmpresaComponent,
    AddAlocacaoEmpresaComponent,
    ListarFatoresComponent,
    AddFatorComponent,
    AddConfiguracaoComponent,
    ListarConfiguracoesComponent,
    EditConfiguracaoComponent,
    ListarMedicoesComponent,
    VerMedicaoComponent,
    CriarMedicaoComponent,
    VerMedicaoPessoaComponent,
    EditarMedicaoPessoaComponent,
    DynamicFormComponent,
    DynamicFormQuestionComponent,
    SalaTrofeusComponent
  ]
})

export class AdminLayoutModule {}
