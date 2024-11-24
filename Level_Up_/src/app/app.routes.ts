import { Routes } from '@angular/router';
import { ClienteComponent } from './cliente/cliente.component';
import { PaginaInicialComponent } from './pagina-inicial/pagina-inicial.component';
import { DetalheComponent } from './detalhe/detalhe.component';
import { BuscaComponent } from './busca/busca.component';
import { LoginComponent } from './login/login.component';
import { CestaComponent } from './cesta/cesta.component';
import { EsqueciComponent } from './esqueci/esqueci.component';


export const routes: Routes = [
    {path:"cliente", component:ClienteComponent},
    {path:"pagina-inicial", component:PaginaInicialComponent},
    {path:"", component:PaginaInicialComponent},
    {path:"detalhe", component:DetalheComponent},
    {path:"busca", component:BuscaComponent},
    {path:"login", component:LoginComponent},
    {path:"cesta", component:CestaComponent},
    {path:"esqueci", component:EsqueciComponent}
    
];
