import { Routes } from '@angular/router';

import { DashboardComponent } from '../../components/dashboard/dashboard.component';
import { UserProfileComponent } from '../../components/user-profile/user-profile.component';
import { AddAlocacaoComponent } from 'app/components/alocacao/add-alocacao/add-alocacao.component';
import { ListarEmpresasComponent } from 'app/components/empresa/listar-empresas/listar-empresas.component';
import { ListarUsuariosComponent } from 'app/components/usuarios/listar-usuarios/listar-usuarios.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',                        component: DashboardComponent },
    { path: 'user-profile',                     component: UserProfileComponent },
    { path: 'companies-list',                   component: ListarEmpresasComponent },
    { path: 'users-list',                       component: ListarUsuariosComponent },
    { path: 'user-profile/add-alocation/:id',   component: AddAlocacaoComponent },
];