import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  hideComponentOnPage: boolean = true;
  constructor(private _router: Router) {
    // Écoute les événements de navigation pour détecter la page spécifique
  }
  ngOnInit(): void {
    this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Vérifie si la route actuelle correspond à la page spécifique
        console.log(event.url);
        if (event.url === '/signup' || event.url === '/profil') {
          this.hideComponentOnPage = false;
        } else {
          this.hideComponentOnPage = true;
        }
      }
    });
  }
}
