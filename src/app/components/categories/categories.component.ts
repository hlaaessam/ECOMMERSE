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
import { ICategory } from '../../core/interfaces/icategory';
import { IProduct } from '../../core/interfaces/iproduct';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../../core/services/categories.service';
import { ProductsService } from '../../core/services/products.service';
import { RouterLink } from '@angular/router';
import { FormsModule, NgModel } from '@angular/forms';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { CategoryComponent } from '../category/category.component';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    CurrencyPipe,
    SlicePipe,
    RouterLink,
    FormsModule,
    SearchPipe,
    CategoryComponent,
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent {
  searchText: WritableSignal<string> = signal('');
  private readonly _CategoriesService = inject(CategoriesService);
  private readonly _ProductsService = inject(ProductsService);

  categoriesList: WritableSignal<ICategory[]> = signal([]);
  selectedCategory: WritableSignal<ICategory | null> = signal(null);
  allProducts: WritableSignal<IProduct[]> = signal([]);
  isLoading: WritableSignal<boolean> = signal(true);
  isLoadingDetail: WritableSignal<boolean> = signal(false);
  searchTerm: string = '';

  skeletons = Array(10).fill(0);

  categoryProducts = computed(() => {
    const cat = this.selectedCategory();
    if (!cat) return [];
    return this.allProducts().filter((p) => p.category._id === cat._id);
  });

  filteredCategories = computed(() => {
    const term = this.searchText().toLowerCase().trim();
    if (!term) return this.categoriesList();
    return this.categoriesList().filter((c) =>
      c.name.toLowerCase().includes(term),
    );
  });

  private getAllCategoriesSub!: Subscription;
  private getSpecificCategorySub!: Subscription;
  private getAllProductsSub!: Subscription;

  ngOnInit(): void {
    this.getAllCategoriesSub = this._CategoriesService
      .getAllCategories()
      .subscribe({
        next: (res) => {
          this.categoriesList.set(res.data);
          this.isLoading.set(false);
        },
        error: () => this.isLoading.set(false),
      });

    this.getAllProductsSub = this._ProductsService.getAllProducts().subscribe({
      next: (res) => this.allProducts.set(res.data),
    });
  }

  ngOnDestroy(): void {
    this.getAllCategoriesSub?.unsubscribe();
    this.getSpecificCategorySub?.unsubscribe();
    this.getAllProductsSub?.unsubscribe();
  }

  openCategory(id: string): void {
    this.isLoadingDetail.set(true);
    this.selectedCategory.set(null);

    this.getSpecificCategorySub?.unsubscribe();
    this.getSpecificCategorySub = this._CategoriesService
      .getSpecificCategory(id)
      .subscribe({
        next: (res) => {
          this.selectedCategory.set(res.data);
          this.isLoadingDetail.set(false);
        },
        error: () => this.isLoadingDetail.set(false),
      });
  }

  closeCategory(): void {
    this.selectedCategory.set(null);
    this.getSpecificCategorySub?.unsubscribe();
  }
}
