import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../core/services/orders.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgClass, FormsModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent {
  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _OrdersService = inject(OrdersService);

  cartId: string | null = null;
  msgError: string = '';
  isLoading: boolean = false;
  isSuccess: boolean = false;
  ordersForm: FormGroup = this._FormBuilder.group({
    details: [null],
    phone: [
      null,
      [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
    ],
    city: [
      null,
      [Validators.required, Validators.minLength(3), Validators.maxLength(20)],
    ],
  });

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe((params) => {
      this.cartId = params.get('id');
    });
  }

  onSubmit(): void {
    this.isLoading = true;
    if (this.ordersForm.valid) {
      //call api
      this._OrdersService
        .checkout(this.cartId, this.ordersForm.value)
        .subscribe({
          next: (res) => {
            this.isLoading = false;
            if (res.status == 'success') {
              this.isSuccess = true;
              // setTimeout(() => {
              //   window.open(res.session.url, '_self');
              // }, 1000);
              // or
              setTimeout(() => {
                window.location.href = res.session.url;
              }, 1000);
            }
          },
          error: (err) => {
            // this.msgError = err.error.message;
            this.isLoading = false;
          },
        });
    } else {
      this.ordersForm.setErrors({ mismatch: true });
      this.ordersForm.markAllAsTouched();
      this.isLoading = false;
    }
  }
}
