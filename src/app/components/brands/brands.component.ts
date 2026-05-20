import {
  Component,
  inject,
  signal,
  WritableSignal,
  computed,
} from '@angular/core';
import {
  CommonModule,
  CurrencyPipe,
  DatePipe,
  SlicePipe,
} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { IBrand } from '../../core/interfaces/ibrand';
import { IProduct } from '../../core/interfaces/iproduct';
import { BrandsService } from '../../core/services/brands.service';
import { ProductsService } from '../../core/services/products.service';
import { CartService } from '../../core/services/cart.service';
import { SearchPipe } from '../../core/pipes/search.pipe';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    CurrencyPipe,
    SlicePipe,
    FormsModule,
    RouterLink,
    SearchPipe,
  ],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss',
})
export class BrandsComponent {
  private readonly _BrandsService = inject(BrandsService);
  private readonly _ProductsService = inject(ProductsService);
  private readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService);

  brandsList: WritableSignal<IBrand[]> = signal([]);
  selectedBrand: WritableSignal<IBrand | null> = signal(null);
  allProducts: WritableSignal<IProduct[]> = signal([]);
  isLoading: WritableSignal<boolean> = signal(true);
  isLoadingDetail: WritableSignal<boolean> = signal(false);
  searchText: WritableSignal<string> = signal('');
  productSearch: string = '';

  skeletons = Array(10).fill(0);
  productSkeletons = Array(8).fill(0);

  brandProducts = computed(() => {
    const brand = this.selectedBrand();
    if (!brand) return [];
    return this.allProducts().filter((p) => p.brand._id === brand._id);
  });

  private getAllBrandsSub!: Subscription;
  private getSpecificBrandSub!: Subscription;
  private getAllProductsSub!: Subscription;

  ngOnInit(): void {
    this.getAllBrandsSub = this._BrandsService.getAllBrands().subscribe({
      next: (res) => {
        this.brandsList.set(res.data);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false),
    });

    this.getAllProductsSub = this._ProductsService.getAllProducts().subscribe({
      next: (res) => this.allProducts.set(res.data),
    });
  }

  ngOnDestroy(): void {
    this.getAllBrandsSub?.unsubscribe();
    this.getSpecificBrandSub?.unsubscribe();
    this.getAllProductsSub?.unsubscribe();
  }

  openBrand(id: string): void {
    this.isLoadingDetail.set(true);
    this.selectedBrand.set(null);
    this.productSearch = '';

    this.getSpecificBrandSub?.unsubscribe();
    this.getSpecificBrandSub = this._BrandsService
      .getSpecificBrand(id)
      .subscribe({
        next: (res) => {
          this.selectedBrand.set(res.data);
          this.isLoadingDetail.set(false);
        },
        error: () => this.isLoadingDetail.set(false),
      });
  }

  closeBrand(): void {
    this.selectedBrand.set(null);
    this.getSpecificBrandSub?.unsubscribe();
  }

  addCart(id: string): void {
    this._CartService.addToCart(id).subscribe({
      next: (res) => {
        this._ToastrService.success(res.message, '', {
          timeOut: 1000,
          progressBar: true,
          progressAnimation: 'increasing',
        });
        this._CartService.cartNumber.set(res.numOfCartItems);
      },
    });
  }
}
