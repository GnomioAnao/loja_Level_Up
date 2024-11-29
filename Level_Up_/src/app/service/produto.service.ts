import { Injectable } from '@angular/core';
import { Produto } from '../model/produto';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(private http: HttpClient) { }

  vitrine():Observable<any>{
    return this.http.get("http://localhost:8080/api/produto/vitrine");
  }

  // detalhe(codigo: number): Observable<any>{
  //   return this.http.get("http://localhost:8080/api/produto/detalhe/"+ codigo)
  // }

//   pesquisar(termo:string):Observable<any> {
//     return this.http.get("http://localhost:8080/api/produto/busca/"+termo); 
//   }
}
