import { Routes } from '@angular/router';

import { DashboardComponent } from '../../components/dashboard/dashboard.component';
import { UserProfileComponent } from '../../components/user-profile/user-profile.component';
import { AddAlocacaoComponent } from 'app/components/alocacao/add-alocacao/add-alocacao.component';
import { ListarEmpresasComponent } from 'app/components/empresa/listar-empresas/listar-empresas.component';
import { ListarUsuariosComponent } from 'app/components/usuarios/listar-usuarios/listar-usuarios.component';
import { CriarEmpresaComponent } from 'app/components/empresa/criar-empresa/criar-empresa.component';
import { CriarUsuarioComponent } from 'app/components/usuarios/criar-usuario/criar-usuario.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',                        component: DashboardComponent },
    { path: 'user-profile',                     component: UserProfileComponent },
    { path: 'companies-list',                   component: ListarEmpresasComponent },
    { path: 'companies-create',                 component: CriarEmpresaComponent },
    { path: 'users-list',                       component: ListarUsuariosComponent },
    { path: 'users-create',                     component: CriarUsuarioComponent },
    { path: 'user-profile/add-alocation/:id',   component: AddAlocacaoComponent },
];



