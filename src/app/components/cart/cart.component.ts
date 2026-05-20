import { Component, inject } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { ICart } from '../../core/interfaces/icart';
import { CurrencyPipe, SlicePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, RouterLink, SlicePipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  private readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService);

  cartDetails: ICart = {} as ICart;
  ngOnInit(): void {
    this._CartService.getCartProudcts().subscribe({
      next: (res) => {
        this.cartDetails = res.data;
      },
    });
  }

  removeFromCart(id: string): void {
    this._CartService.deleteSpecificCartItem(id).subscribe({
      next: (res) => {
        this.cartDetails = res.data;
        // this._CartService.cartNumber.next(res.numOfCartItems);

        this._CartService.cartNumber.set(res.numOfCartItems);
      },
    });
  }

  updateCount(id: string, count: number): void {
    if (count > 0) {
      this._CartService.updateProductQuantity(id, count).subscribe({
        next: (res) => {
          this.cartDetails = res.data;
          if (res.status === 'success') {
            this._ToastrService.success(
              'Product quantity updated successfully',
              '',
              {
                timeOut: 1000,
                progressBar: true,
                progressAnimation: 'increasing',
              },
            );
          }
        },
      });
    }
  }

  clearItems(): void {
    this._CartService.clearCart().subscribe({
      next: (res) => {
        if (res.message === 'success') {
          this.cartDetails = {} as ICart;
          // BehaviorSubject
          // this._CartService.cartNumber.next(0);

          // signal
          this._CartService.cartNumber.set(0);
        }
      },
    });
  }
}
