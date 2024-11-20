import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cliente } from '../model/cliente';
import { FormsModule } from '@angular/forms';

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
  public fazerLogin(){
    if(this.obj.email=='Gnomio@gmail.com' &&
      this.obj.senha=='123456'){
        localStorage.setItem("pagina-inicial", JSON.stringify(this.obj));
        window.location.href="./pagina-inicial";
        this.mensagem="Correto!";
      } else {
        this.mensagem = "Email ou Senha inválidos, reinicie o Mundo!!!";
        localStorage.removeItem("cliente");
      }
  }
  public novoCadastro(){
    localStorage.setItem("cliente", JSON.stringify(this.obj));
    window.location.href="./cliente";
  }

  toggleSenha() {
    this.senhaOculta = !this.senhaOculta; // Alterna a visibilidade da senha
  }
}


