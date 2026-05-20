import { Component, inject } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { AllordersService } from '../../core/services/allorders.service';
import { Iorders } from '../../core/interfaces/iorders';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss',
})
export class AllordersComponent {
  private readonly _AllordersService = inject(AllordersService);
  userData: any = null;
  orders!: Iorders[];
  ngOnInit(): void {
    this.userData = jwtDecode(localStorage.getItem('userToken')!);

    this._AllordersService.getAllOrders(this.userData.id).subscribe({
      next: (res) => {
        this.orders = res;
      },
    });
  }
}
