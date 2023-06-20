import { Component, Input, OnInit } from '@angular/core';
import { Iproperty } from 'src/app/interfaces/Iproperty.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() property!: Iproperty;
  firstImage: string = '';
  ngOnInit(): void {
    if (
      this.property &&
      this.property.images &&
      this.property.images.length > 0
    ) {
      this.firstImage = this.property.images[0].path;
      console.log(this.firstImage);
    } else {
      this.firstImage = '../../../assets/images/logo.svg';
    }
  }
}
