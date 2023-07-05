import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-immostate',
  templateUrl: './immostate.component.html',
  styleUrls: ['./immostate.component.scss'],
})
export class ImmostateComponent {
  activeIndex: number = 0;

  constructor(public messageService: MessageService) {}
  onActiveIndexChange(event: number) {
    this.activeIndex = event;
  }
  items: any[] = [];
  ngOnInit() {
    this.items = [
      {
        label: 'Adresse',
        routerLink: 'adress-state',
      },
      {
        label: 'Type de bien',
        routerLink: 'type-state',
      },
      {
        label: 'Intérieur',
        routerLink: 'interior-state',
      },
      {
        label: 'Extérieur',
        routerLink: 'exterior-state',
      },
      {
        label: 'Photo du bien',
        routerLink: 'picture-state',
      },
    ];
  }
}
