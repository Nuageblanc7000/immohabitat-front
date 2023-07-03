import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IUser } from 'src/app/interfaces/IUser.interface';
import { AuthService } from 'src/app/services/auth.service';
import { favoriteService } from 'src/app/services/favorite.service';

@Component({
  selector: 'app-my-favoris',
  templateUrl: './my-favorites.component.html',
  styleUrls: ['./my-favorites.component.scss'],
})
export class MyFavorisComponent {
  constructor(
    private _favoriteService: favoriteService,
    private _authService: AuthService,
    private _router: Router
  ) {}

  myFavorites: any[] = [];
  imagePath: string = '../../../assets/images/schematic.svg';
  unsubScribe: Subscription = new Subscription();
  ngOnInit(): void {
    this.unsubScribe.add(
      this._authService.isAuth$.subscribe({
        next: (user: boolean | null) => {
          if (!user) {
            this._router.navigate(['/']);
          }
        },
      })
    );
    this.unsubScribe.add(
      this._favoriteService.userFavoriteList().subscribe({
        next: (p: any) => {
          this.myFavorites = p;
        },
      })
    );
  }

  handleImageError(e: Event) {
    const target = e.target as HTMLImageElement;
    target.src = '../../../assets/images/schematic.svg';
  }

  handleDelete(e: Event, propertyId: number) {
    e.stopImmediatePropagation();
    this.myFavorites = this.myFavorites.filter(
      (p) => p.property.id !== propertyId
    );
    console.log(this.myFavorites, 'après');
  }
}
