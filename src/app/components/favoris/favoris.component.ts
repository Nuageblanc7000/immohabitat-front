import { Component, Input, OnInit } from '@angular/core';
import { Iproperty } from 'src/app/interfaces/Iproperty.interface';
import { favoriteService } from 'src/app/services/favorite.service';

@Component({
  selector: 'app-favoris',
  templateUrl: './favoris.component.html',
  styleUrls: ['./favoris.component.scss'],
})
export class FavorisComponent implements OnInit {
  @Input() maxWidth: number = 80;
  @Input() height: number = 80;
  @Input() propertyId!: number;
  isFavorite: boolean = false;
  isUser: boolean = true;
  listFavoriteUser: any[] = [];
  constructor(private _favoriteService: favoriteService) {}

  ngOnInit(): void {
    this._favoriteService.userFavoriteList().subscribe({
      next: (data: any) => {
        this.listFavoriteUser = data.data[0];
        this.isFavorite = this.listFavoriteUser.some(
          (p) => p.isFavorite && p.property.id === this.propertyId
        );
      },
    });
  }
  channgeFavorite() {
    if (this.isUser) {
      this.isFavorite = !this.isFavorite;
      this._favoriteService.favoriteToggle(this.propertyId).subscribe({
        next: (data: any) => (this.isFavorite = data.data),
      });
    } else {
      //faire apparaitre la box de connection
      console.log(this.isUser);
    }
  }
}
