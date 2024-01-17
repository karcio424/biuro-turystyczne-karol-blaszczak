// cart/cart-overlay.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-cart-overlay',
  template: `
    <div class="cart-overlay">
      <app-cart></app-cart>
    </div>
  `,
  styles: [`
    .cart-overlay {
      position: fixed;
      bottom: 16px;
      right: 16px;
    }
  `]
})
export class CartOverlayComponent {
}
