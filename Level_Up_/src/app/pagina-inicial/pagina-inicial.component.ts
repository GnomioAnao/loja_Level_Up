import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { NotificacaoComponent } from '../notificacao/notificacao.component';
import { Produto } from '../model/produto';
import { Item } from '../model/item';
import { Cesta } from '../model/cesta';
import { ProdutoService } from '../service/produto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagina-inicial',
  standalone: true,
  imports: [CommonModule, NotificacaoComponent],
  templateUrl: './pagina-inicial.component.html',
  styleUrl: './pagina-inicial.component.css'
})

export class PaginaInicialComponent {
  public mensagem: string = "Conheça nossos produtos que poderam dar um Level-Up na sua jogatina!";
  public lista:  Produto[] = [

    /* Os códigos são refentes as imagens, por exemplo: a imagem "carta1" tem código 1 */
    

  ];
  constructor(private service:ProdutoService, private router: Router) {
    this.carregarListaProduto();
  }  

  carregarListaProduto(){
    this.service.vitrine().subscribe({
      next:(data)=>{
        console.log ('Produtos carregados', data);
        this.lista = data
        if(this.lista.length <= 0) this.mensagem = "Vitrine Vazia!!!";
      },
      error:(msg)=>{
        console.error ('Erro ao carregar produtos:', msg);
        (this.mensagem = "Ocorreu erro tente mais tarde!!!!")
      }
      
    })
  }

  

  public verDetalhe(item:Produto) {
    // localStorage.setItem("produto", JSON.stringify(item));
    // window.location.href = "./detalhe";
   window.location.href =`/detalhe/${item.codigo}`;
  //this.router.navigate(['/detalhe']);  // Navega para a página de detalhes com o código
  }

  public adicionarItem(obj:Produto){
    let json = localStorage.getItem("cesta");
    let jsonCliente = localStorage.getItem("cliente");
    let cesta: Cesta = new Cesta();
    let item: Item = new Item();
    if(json==null){      //CESTA NAO EXISTE     
        item.codigo=obj.codigo;
        item.produto=obj;
        item.quantidade=1;
        item.valor= obj.valor;          
        cesta.codigo = 1;
        cesta.total = obj.valor;
        cesta.itens.push(item);          
        if(jsonCliente!=null) cesta.cliente = JSON.parse(jsonCliente);          
    } 
    else {  //CESTA EXISTE
        let achou = false;
        cesta = JSON.parse(json);
        for(let i=0; i<cesta.itens.length; i++){
          if(cesta.itens[i].codigo==obj.codigo){  //ITEM JA EXISTE
            cesta.itens[i].quantidade = cesta.itens[i].quantidade + 1;
            cesta.itens[i].valor =  cesta.itens[i].quantidade * cesta.itens[i].produto.valor;
            achou = true;
            break;
          }            
        }
        if(!achou){  //ITEM NAO EXISTE
          item.codigo=obj.codigo;
          item.produto=obj;
          item.quantidade=1;
          item.valor= obj.valor;    
          cesta.itens.push(item);      
        }
      }

      cesta.total = 0; //ATUALIZA O VALOR TOTAL DA CESTA
      for(let i=0; i<cesta.itens.length; i++){
        cesta.total= cesta.itens[i].valor + cesta.total;
      }

      localStorage.setItem("cesta", JSON.stringify(cesta));
      window.location.href = "./cesta";
  } 

}
