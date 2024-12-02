import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  public filtro : string = "";
  
  constructor(private router: Router) {}

  fazerBusca() {
    if (this.filtro.trim()) {
      window.location.href = `/busca?q=${this.filtro}`;
    }
  }
}
