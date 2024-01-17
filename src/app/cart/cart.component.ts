// cart/cart.component.ts
import { Component, OnInit } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { CartOverlayComponent } from './cart-overlay/cart-overlay.component';
import { BasketInfoService } from './basket-info.service';
import { Wycieczka } from '../wycieczki/wycieczki.model';

@Component({
  selector: 'app-cart',
  template: `
    <ng-container *ngIf="cart.length > 0">
      <!-- ... existing cart template ... -->
    </ng-container>
  `,
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(
    private overlay: Overlay,
    private basketService: BasketInfoService
  ) { }
  cart: Wycieczka[] = []

  ngOnInit() {
    this.cart = this.basketService.getBasket();
    this.createOverlay();
  }

  createOverlay() {
    const overlayRef = this.overlay.create();
    const portal = new ComponentPortal(CartOverlayComponent);
    overlayRef.attach(portal);
  }

  getCartSum(): number {
    let sum = 0;
    for (let item of this.cart) {
      sum += item.cenaJednostkowa * item.ilosc;
    }
    return sum;
  }

  removeFromCart(item: Wycieczka): void {
    const index = this.cart.indexOf(item);
    if (index !== -1) {
      this.cart.splice(index, 1);
    }
  }

  increaseQuantity(item: Wycieczka): void {
    item.ilosc++;
  }

  decreaseQuantity(item: Wycieczka): void {
    if (item.ilosc > 1) {
      item.ilosc--;
    }
  }

  purchase(): void {
    const selectedItems = this.cart.filter(item => item.selected);
    // Implement logic for purchasing selected items
    // You can update the status of purchased items, remove them from the cart, etc.
    console.log("Purchased items:", selectedItems);
  }
}
