import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-favoris',
  templateUrl: './favoris.component.html',
  styleUrls: ['./favoris.component.scss'],
})
export class FavorisComponent {
  @Input() maxWidth: number = 80;
  @Input() height: number = 80;
}
