import { Component } from '@angular/core';
import { Subscription, take } from 'rxjs';
import { NaviService } from 'src/app/services/navi.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private _naviService: NaviService) {}
  //menu phone
  isOpened: boolean = false;
  private unsubscribe: Subscription = new Subscription();
  ngOnInit(): void {
    this.unsubscribe.add(
      this._naviService.isOpened.subscribe({
        next: (p: boolean) => {
          console.log(p);
          this.isOpened = p;
        },
      })
    );
  }
  ngOnDestroy(): void {
    this.unsubscribe.unsubscribe();
  }
}
