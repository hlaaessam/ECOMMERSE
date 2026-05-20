import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { IProduct } from '../../core/interfaces/iproduct';
import { Subscription } from 'rxjs';
import { TermtextPipe } from '../../core/pipes/termtext.pipe';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import {
  CurrencyPipe,
  SlicePipe,
  TitleCasePipe,
  UpperCasePipe,
} from '@angular/common';
import { RouterLink } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CarouselModule,
    RouterLink,
    UpperCasePipe,
    TitleCasePipe,
    SlicePipe,
    CurrencyPipe,
    TermtextPipe, //custom pipe
    SearchPipe,
    FormsModule,
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  searchText: string = '';
  private readonly _ProductsService = inject(ProductsService);

  private readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService);

  productsList: WritableSignal<IProduct[]> = signal([]);

  getAllProductsSub!: Subscription;

  ngOnInit(): void {
    this.getAllProductsSub = this._ProductsService.getAllProducts().subscribe({
      next: (res) => {
        this.productsList.set(res.data);
      },
    });
  }

  addCart(id: string) {
    this._CartService.addToCart(id).subscribe({
      next: (res) => {
        this._ToastrService.success(res.message, '', {
          timeOut: 1000,
          progressBar: true,
          progressAnimation: 'increasing',
        });
        // BehaviorSubject
        // this._CartService.cartNumber.next(res.numOfCartItems);

        // signal
        this._CartService.cartNumber.set(res.numOfCartItems);
      },
    });
  }
  ngOnDestroy(): void {
    this.getAllProductsSub?.unsubscribe();
  }
}
