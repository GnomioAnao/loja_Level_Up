import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Produto } from '../model/produto';
import { Item } from '../model/item';
import { Cesta } from '../model/cesta';
import { ProdutoService } from '../service/produto.service';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-detalhe',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalhe.component.html',
  styleUrl: './detalhe.component.css'
})

export class DetalheComponent {
  public mensagem: String = "";
  public item: Produto = new Produto();
  

  
  constructor(private route: ActivatedRoute, private service: ProdutoService) {
    this.route.params.subscribe(params => {
      const codigo = params['codigo'];
      this.carregarProduto(codigo);
    });
  }

  carregarProduto(codigo: number) {
    this.service.detalhe(codigo).subscribe({
      next: (produto) => this.item = produto,
      error: () => this.mensagem = "Produto não encontrado!"
    });
  }

  // constructor(private route: ActivatedRoute, private service: ProdutoService) {
  //   this.route.params.subscribe(params => {
  //     const codigo = +params['codigo']; // Obtém o código da rota
  //     if (!isNaN(codigo)) {
  //       this.carregarProduto(codigo);
  //     } else {
  //       this.mensagem = "Código de produto inválido!";
  //     }
  //   });
  // }

  // carregarProduto(codigo: number) {
  //   this.service.detalhe(codigo).subscribe({
  //     next: (produto) => this.item = produto,
  //     error: () => this.mensagem = "Produto não encontrado!"
  //   });
  // }


  

  public adicionarItem(obj: Produto | null) {
    if (obj) {
      let cesta = JSON.parse(localStorage.getItem("cesta") || '[]');
      let jsonCliente = localStorage.getItem("cadastro");
      let novaCesta: Cesta = new Cesta();
      let item: Item = new Item();

      if (cesta.length === 0) {
        item.codigo = obj.codigo;
        item.produto = obj;
        item.quantidade = 1;
        item.valor = obj.valor;
        novaCesta.codigo = 1;
        novaCesta.total = obj.valor;
        novaCesta.itens.push(item);
        if (jsonCliente != null) novaCesta.cliente = JSON.parse(jsonCliente);
      } else {
        let achou = false;
        novaCesta = cesta;
        for (let i = 0; i < novaCesta.itens.length; i++) {
          if (novaCesta.itens[i].codigo === obj.codigo) {
            novaCesta.itens[i].quantidade += 1;
            novaCesta.itens[i].valor = novaCesta.itens[i].quantidade * novaCesta.itens[i].produto.valor;
            achou = true;
            break;
          }
        }
        if (!achou) {
          item.codigo = obj.codigo;
          item.produto = obj;
          item.quantidade = 1;
          item.valor = obj.valor;
          novaCesta.itens.push(item);
        }
      }

      novaCesta.total = novaCesta.itens.reduce((total, it) => total + it.valor, 0);
      localStorage.setItem("cesta", JSON.stringify(novaCesta));
      window.location.href = "./cesta";
    }
  }

}
