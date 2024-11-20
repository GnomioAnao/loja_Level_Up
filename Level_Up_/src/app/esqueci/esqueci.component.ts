import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cliente } from '../model/cliente';
import { FormsModule } from '@angular/forms';

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
  

  // o '+' junta a string do email (concatena)
  public reenviar(){
    this.mensagem= "As instruções foram eviadas para o Email:" 
    + this.obj.email;
  }
}
