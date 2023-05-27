/* eslint-disable no-underscore-dangle */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { API_PAY, API_PAY_LIST, API_URL } from '../data/uri/api-url.constants';
import { Payment } from '../interfaces/payment.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private _payments$ = new BehaviorSubject<Payment[]>([]);

  get payments$(): Observable<Payment[]> {
    return this._payments$;
  }

  paymentItemsForPay: Payment[] = [];

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private snackBar: MatSnackBar,
  ) {}

  pay() {
    return this.http.post<string>(
      `${API_URL}${API_PAY}`,
      this.paymentItemsForPay,
      {
        headers: { Authorization: `Bearer ${this.authService.token}` },
        responseType: 'text' as 'json'
      }
    ).pipe(
      tap(() => this.loadList()),
    );
  }

  loadList() {
    this.http.get<Payment[]>(
      `${API_URL}${API_PAY_LIST}`,
      { headers: { Authorization: `Bearer ${this.authService.token}` } }
    ).subscribe({
      next: (data) => this._payments$.next(data),
      error: (error) => this.openSnackBar(error.error.message, 'OK')
    });
  }

  private openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }
}
