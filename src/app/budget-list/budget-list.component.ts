import { Component, OnInit, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { BudgetService } from '../services/budget.service';

@Component({
  selector: 'app-budget-list',
  standalone: true,
  imports: [CommonModule], // Agrega CommonModule a los imports
  templateUrl: './budget-list.component.html',
  styleUrl: './budget-list.component.css'
})

export class BudgetListComponent implements OnInit {
  budgets: any[] = [];

  constructor(private budgetService: BudgetService) {
  }

  ngOnInit() {
    this.budgets = this.budgetService.getBudgets();
  }

}
