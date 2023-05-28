/* eslint-disable no-underscore-dangle */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable, catchError, map, tap } from 'rxjs';
import { API_PAY, API_PAY_DELETE, API_PAY_DELETE_OAUTH, API_PAY_LIST, API_PAY_LIST_OAUTH, API_PAY_OAUTH, API_URL } from '../data/uri/api-url.constants';
import { Cart } from '../interfaces/cart';
import { Payment } from '../interfaces/payment.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private _payments$ = new BehaviorSubject<Cart[]>([]);

  _payments: Cart[];

  get payments$(): Observable<Cart[]> {
    return this._payments$;
  }

  get payments(): Cart[] {
    return this._payments;
  }

  paymentItemsForPay: Payment[] = [];

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private snackBar: MatSnackBar,
  ) {}

  pay() {
    return this.getPaySteam().pipe(
      tap(() => this.loadList()),
    );
  }

  loadList() {
    this.getListSteam().pipe(
      map((payments: Payment[]) => payments.map((payment) => ({
        ...payment, queryParams: {},
      }) as Cart)),
      catchError(() => [])
    ).subscribe({
      next: (data) => {
        this._payments$.next(data);
        this._payments = data;
      },
      error: (error) => this.openSnackBar(error.error.message, 'OK')
    });
  }

  delete(id: string) {
    this.getDeleteSteam(id).subscribe({
      next: () => {
        this.openSnackBar('Booking deleted!', 'OK');
        this.loadList();
      },
      error: (error) => this.openSnackBar(error.error.message, 'OK')
    });
  }

  private getListSteam() {
    if (this.authService.isOauth) {
      return this.http.post<Payment[]>(
        `${API_URL}${API_PAY_LIST_OAUTH}?email=${this.authService.userData.email}`,
        {}
      );
    }
    return this.http.get<Payment[]>(
      `${API_URL}${API_PAY_LIST}`,
      { headers: { Authorization: `Bearer ${this.authService.token}` } }
    );
  }

  private getPaySteam() {
    if (this.authService.isOauth) {
      return this.http.post<string>(
        `${API_URL}${API_PAY_OAUTH}?email=${this.authService.userData.email}`,
        this.paymentItemsForPay,
        { responseType: 'text' as 'json' }
      );
    }
    return this.http.post<string>(
      `${API_URL}${API_PAY}`,
      this.paymentItemsForPay,
      {
        headers: { Authorization: `Bearer ${this.authService.token}` },
        responseType: 'text' as 'json'
      }
    );
  }

  private getDeleteSteam(id: string) {
    if (this.authService.isOauth) {
      return this.http.delete<string>(
        `${API_URL}${API_PAY_DELETE_OAUTH}?email=${this.authService.userData.email}&id=${id}`,
        { responseType: 'text' as 'json' }
      );
    }
    return this.http.delete<string>(
      `${API_URL}${API_PAY_DELETE}?id=${id}`,
      {
        headers: { Authorization: `Bearer ${this.authService.token}` },
        responseType: 'text' as 'json'
      }
    );
  }

  private openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }
}
