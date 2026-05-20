import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
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
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../../core/services/categories.service';
import { ProductsService } from '../../core/services/products.service';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { ICategory } from '../../core/interfaces/icategory';
import { IProduct } from '../../core/interfaces/iproduct';
import { SearchPipe } from '../../core/pipes/search.pipe';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    CurrencyPipe,
    SlicePipe,
    RouterLink,
    FormsModule,
    SearchPipe,
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
})
export class CategoryComponent implements OnInit, OnDestroy {
  @Input({ required: true }) categoryId!: string;
  @Output() close = new EventEmitter<void>();

  private readonly _CategoriesService = inject(CategoriesService);
  private readonly _ProductsService = inject(ProductsService);
  private readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService);

  category: WritableSignal<ICategory | null> = signal(null);
  allProducts: WritableSignal<IProduct[]> = signal([]);
  isLoading: WritableSignal<boolean> = signal(true);
  searchText: string = '';

  // ── Computed: products filtered by this category ──────────────────────
  categoryProducts = computed(() =>
    this.allProducts().filter((p) => p.category._id === this.categoryId),
  );

  private categorySub!: Subscription;
  private productsSub!: Subscription;

  ngOnInit(): void {
    this.categorySub = this._CategoriesService
      .getSpecificCategory(this.categoryId)
      .subscribe({
        next: (res) => {
          this.category.set(res.data);
          this.isLoading.set(false);
        },
        error: () => this.isLoading.set(false),
      });

    this.productsSub = this._ProductsService.getAllProducts().subscribe({
      next: (res) => this.allProducts.set(res.data),
    });
  }

  ngOnDestroy(): void {
    this.categorySub?.unsubscribe();
    this.productsSub?.unsubscribe();
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
