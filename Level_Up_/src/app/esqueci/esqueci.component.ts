import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cliente } from '../model/cliente';
import { FormsModule } from '@angular/forms';
import { ClienteService } from '../service/cliente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-esqueci',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './esqueci.component.html',
  styleUrl: './esqueci.component.css'
})
export class EsqueciComponent {
  public mensagem: string = ""
  public obj: Cliente = new Cliente();
  

  constructor(private service: ClienteService, private router: Router){}

  public reenviar() {
    if (this.obj.email === "") {
      this.mensagem = "Preencha o campo e-mail.";
    } else {
      this.service.esqueciSenha(this.obj).subscribe({
        next: (response: any) => {
          if (response.token) {
            this.router.navigate(['/redefinir-senha'], { 
              queryParams: { email: this.obj.email, token: response.token } 
            });
          } else {
            this.mensagem = response.mensagem || "Erro desconhecido.";
          }
        },
        error: (err) => {
          if (err.status === 404) {
            this.mensagem = err.error.mensagem || "E-mail não encontrado, verifique!!";
          } else {
            this.mensagem = "Erro ao processar a solicitação.";
          }
          console.error(err);
        }
      });
    }
  }
}

  // o '+' junta a string do email (concatena)
//   public reenviar(){
//     this.mensagem= "As instruções foram eviadas para o Email:" 
//     + this.obj.email;
//   }
// }
