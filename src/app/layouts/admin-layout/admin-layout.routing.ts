import { Routes } from '@angular/router';

import { DashboardComponent } from '../../components/dashboard/dashboard.component';
import { UserProfileComponent } from '../../components/user-profile/user-profile.component';
import { AddAlocacaoComponent } from 'app/components/alocacao/add-alocacao/add-alocacao.component';
import { ListarEmpresasComponent } from 'app/components/empresa/listar-empresas/listar-empresas.component';
import { ListarUsuariosComponent } from 'app/components/usuarios/listar-usuarios/listar-usuarios.component';
import { CriarEmpresaComponent } from 'app/components/empresa/criar-empresa/criar-empresa.component';
import { CriarUsuarioComponent } from 'app/components/usuarios/criar-usuario/criar-usuario.component';
import { VisualizarEmpresaComponent } from 'app/components/empresa/visualizar-empresa/visualizar-empresa.component';
import { AddAlocacaoEmpresaComponent } from 'app/components/alocacao/add-alocacao-empresa/add-alocacao-empresa.component';
import { ListarFatoresComponent } from 'app/components/fatores/listar-fatores/listar-fatores.component';
import { AddFatorComponent } from 'app/components/fatores/add-fator/add-fator.component';
import { AddConfiguracaoComponent } from 'app/components/configuracao/add-configuracao/add-configuracao.component';
import { ListarConfiguracoesComponent } from 'app/components/configuracao/listar-configuracoes/listar-configuracoes.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',                        component: DashboardComponent },
    { path: 'user-profile',                     component: UserProfileComponent },
    { path: 'companies-list',                   component: ListarEmpresasComponent },
    { path: 'companies-create',                 component: CriarEmpresaComponent },
    { path: 'company/:id',                      component: VisualizarEmpresaComponent },
    { path: 'company/:id/add-alocation',        component: AddAlocacaoEmpresaComponent },
    { path: 'users-list',                       component: ListarUsuariosComponent },
    { path: 'users-create',                     component: CriarUsuarioComponent },
    { path: 'user-profile/add-alocation/:id',   component: AddAlocacaoComponent },
    { path: 'factors-list',                     component: ListarFatoresComponent },
    { path: 'factors-create',                   component: AddFatorComponent },
    { path: 'configs-create',                   component: AddConfiguracaoComponent },
    { path: 'configs-create/:id',               component: AddConfiguracaoComponent },
    { path: 'configs-list',                     component: ListarConfiguracoesComponent },
];


