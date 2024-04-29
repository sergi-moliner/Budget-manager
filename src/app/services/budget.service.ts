import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class BudgetService {

  public totalBudgetSubject = new BehaviorSubject<number>(0);
  public checkboxChanged = new BehaviorSubject<boolean>(false);

  private pages: number = 0;
  private idioms: number = 0;
  private previousPages: number = 0;
  private previousIdioms: number = 0;

  setBudget(presupuesto: number) {
    this.totalBudgetSubject.next(presupuesto);
  }

  calculateTotal(pages: number, idioms: number): number {
    if (pages === 1 && idioms === 1) {
      return 0;
    } else {
      return pages * idioms * 30;
    }
  }

  setValues(pages: number, idioms: number) {
    const totalActual = this.totalBudgetSubject.value;
    const totalPagesIdiomsPrevious = this.calculateTotal(this.previousPages, this.previousIdioms);
    this.pages = pages;
    this.idioms = idioms;
    const totalPagesIdioms = this.calculateTotal(this.pages, this.idioms);
    this.totalBudgetSubject.next(totalActual + totalPagesIdioms - totalPagesIdiomsPrevious);
    this.previousPages = this.pages;
    this.previousIdioms = this.idioms;
  }

}
