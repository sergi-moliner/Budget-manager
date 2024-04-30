import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BudgetService } from '../services/budget.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.css'
})
export class PanelComponent {
  @ViewChild('content1') content1!: TemplateRef<any>;
  @ViewChild('content2') content2!: TemplateRef<any>;

  openModal(content: TemplateRef<any>) {
		this.modalService.open(content, { centered: true });
	}

  panelForm: FormGroup;

  constructor(private fb: FormBuilder, private budgetService: BudgetService, private modalService: NgbModal) {
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

