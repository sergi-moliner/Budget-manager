import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BudgetService } from '../services/budget.service';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent implements OnInit {
  budgetForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private budgetService: BudgetService) {
    this.budgetForm = this.formBuilder.group({
      'name': ['', Validators.required],
      'phone': ['', [Validators.required, Validators.pattern('[0-9]{9}')]],
      'email': ['', [Validators.required, Validators.email]],
    });
  }

  getErrorMessage(field: string): string {
    const control = this.budgetForm.get(field);
    if (control && control.invalid && control.dirty) {
      if (control.errors && control.errors["required"]) {
        return 'Este campo es obligatorio.';
      } else if (control.errors && control.errors["pattern"]) {
        return 'El formato es incorrecto.';
      } else if (control.errors && control.errors["email"]) {
        return 'El correo electrónico debe ser válido.';
      }
    }
    return '';
  }

  onSubmit() {
    if (this.budgetForm.valid) {
      const budget = this.budgetForm.value;
      this.budgetService.saveBudget(budget);
      console.log(this.budgetService.getBudgets());
      this.budgetForm.reset();
    } else {
    }
  }

  ngOnInit() {
  }
}
