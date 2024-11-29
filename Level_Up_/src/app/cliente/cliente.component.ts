import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Cliente } from '../model/cliente';
import { ClienteService } from '../service/cliente.service';


@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent {
  public mensagem: string = "";
  public obj: Cliente = new Cliente();
  senhaOculta=true;

  constructor(private service:ClienteService){
    // this.carregar()
  }

  public limpar(){
    this.obj = new Cliente();
  }

  public gravar() {
    this.service.gravar(this.obj).subscribe({
      next: (data: any) => {
        if (data.mensagem.includes("Todo os campos devem ser preenchidos") ||
            data.mensagem.includes("A senha e a confirmação da senha devem ser iguais") ||
            data.mensagem.includes("Cliente já cadastrado com as mesmas informações"))  {
          this.mensagem = data.mensagem;
        } else {
          this.mensagem = data.mensagem;
          this.limpar();
        }
      },
      error: (err) => {
        console.error(err);
        this.mensagem = "Ocorreu um erro, tente mais tarde!";
      }
    });
  }


PasswordVisivel: boolean = false;
public SenhaVisivel(){
  this.PasswordVisivel = !this.PasswordVisivel;
}

ConfirmaVisivel: boolean = false;
public ConfirmaSenhaVisivel(){
  this.ConfirmaVisivel = !this.ConfirmaVisivel;
}

  

  /* nesse bloco de código (o de baixo), estamos fazendo uma decisão para poder carregar o usuário já cadastrado, 
  caso ele já tenha um cadastro ele será levado para página de Login, onde podera entrar ou 
  fazer um novo cadastro */

  // public carregar(){
  //   let json = localStorage.getItem("cliente");
  //   if(json == null){
  //     window.location.href="./login";
  //   } else {
  //     this.obj = JSON.parse(json);      
  //   }
  // }

  

  toggleSenha() {
    this.senhaOculta = !this.senhaOculta; // Alterna a visibilidade da senha
  }

  formatarCPF() {
    // Formata o CPF
    const input = this.obj.documento.replace(/\D/g, ''); // Remove tudo que não é dígito
    if (input.length > 11) {
      this.obj.documento = input.slice(0, 11); // Limita a 11 dígitos
    }
    this.obj.documento = this.obj.documento
      .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona ponto após 3 dígitos
      .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona ponto após 3 dígitos
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Adiciona hífen antes dos últimos 2 dígitos
  }
}

