import { Component, OnInit } from '@angular/core';
import { MainStoreService } from 'src/app/core/services/main-store.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss'],
})
export class CartPageComponent implements OnInit {
  constructor(
    public store: MainStoreService
  ) {}

  ngOnInit(): void {
    console.log(this.store.cart);
  }

  edit(id: string) {
    this.store.removeFromCart(id);
  }

  delete(id: string) {
    this.store.setDataFromCart(id);
  }
}
