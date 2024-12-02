import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cliente } from '../model/cliente';
import { FormsModule } from '@angular/forms';
import { ClienteService } from '../service/cliente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  public mensagem: string = ""
  public obj: Cliente = new Cliente();
  senhaOculta = true;


  constructor(private service: ClienteService, private router: Router) {}

  public fazerLogin() {
    this.service.login(this.obj).subscribe({
      next: (data) => {
        if (data.mensagem) {
          this.mensagem = data.mensagem;
        } else {
          this.obj = data;
          if (this.obj.codigo) {
            localStorage.setItem("cliente", JSON.stringify(this.obj));
            localStorage.setItem("loginMessage", `Seja Bem-vindo, ${this.obj.nome}!`);
            window.location.href="/pagina-inicial"
          } else {
            this.mensagem = "E-mail ou senha inválidos!";
          }
        }
      },
      error: (msg) => {
        this.mensagem = "Ocorreu um erro, tente novamente!";
      }
    });
  }

  public novoCadastro(){
    localStorage.setItem("cliente", JSON.stringify(this.obj));
    window.location.href="./cliente";
  }

  toggleSenha() {
    this.senhaOculta = !this.senhaOculta; // Alterna a visibilidade da senha
  }


}


