import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BudgetService } from '../services/budget.service';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.css'
})
export class PanelComponent {

  panelForm: FormGroup;

  constructor(private fb: FormBuilder, private budgetService: BudgetService) {
    this.panelForm = this.fb.group({
      pages: [1, [Validators.required, Validators.min(1)]],
      idioms: [1, [Validators.required, Validators.min(1)]]
    });

    this.budgetService.checkboxChanged.subscribe(checked => {
      if (!checked) {
        this.panelForm.setValue({pages: 1, idioms: 1});
        this.updateBudget();
      }
    });
  }

  increment(controlName: string) {
    let control = this.panelForm.get(controlName);
    if (control?.value < 10) {
      control?.setValue(control?.value + 1);
      this.updateBudget();
    }
  }

  decrement(controlName: string) {
    let control = this.panelForm.get(controlName);
    if (control?.value > 1) {
      control?.setValue(control?.value - 1);
      this.updateBudget();
    }
  }

  updateBudget() {
    let pages = this.panelForm.get('pages')?.value;
    let idioms = this.panelForm.get('idioms')?.value;
    this.budgetService.setValues(pages, idioms);
  }
}
