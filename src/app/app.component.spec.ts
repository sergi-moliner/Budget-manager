import { TestBed } from '@angular/core/testing';
import { HomeComponent } from './home/home.component';
import { FormGroup } from '@angular/forms';
import { BudgetService } from './services/budget.service';
import { FormControl } from '@angular/forms';
import { ComponentFixture } from '@angular/core/testing';
import { PanelComponent } from './panel/panel.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let budgetService: BudgetService;
  let fixture: ComponentFixture<HomeComponent>;
  let PComponent: PanelComponent;

  beforeEach(async () => {
    PComponent = TestBed.createComponent(PanelComponent).componentInstance;
    component = new HomeComponent(new BudgetService());
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    budgetService = TestBed.inject(BudgetService);
  });

  it('should initialize form and totalBudget correctly', () => {
    expect(component.form instanceof FormGroup).toBeTruthy();
    expect(component.totalBudget).toBe(0);
  });

  it('should update totalBudget when form values change', () => {
    const seoFormControl = component.form.get('seo') as FormControl;
    const adsFormControl = component.form.get('ads') as FormControl;
    const webFormControl = component.form.get('web') as FormControl;

    seoFormControl.setValue(true);
    expect(component.totalBudget).toBe(component.priceSeo);

    adsFormControl.setValue(true);
    expect(component.totalBudget).toBe(component.priceSeo + component.priceAds);

    webFormControl.setValue(true);
    expect(component.totalBudget).toBe(component.priceSeo + component.priceAds + component.priceWeb);

    adsFormControl.setValue(false);
    expect(component.totalBudget).toBe(component.priceSeo + component.priceWeb);
  });

  it('should update totalBudget when BudgetService emits new total', () => {
    const newTotal = 1000;
    budgetService.totalBudgetSubject.next(newTotal);
    expect(component.totalBudget).toBe(newTotal);
  });

  it('should show panel when web is checked', () => {
    const webFormControl = component.form.get('web') as FormControl;
    webFormControl.setValue(true);
    expect(document.getElementById('panel')!.style.display).toBe('block');
  });

  it('should hide panel when web is unchecked', () => {
    const webFormControl = component.form.get('web') as FormControl;
    webFormControl.setValue(false);
    expect(document.getElementById('panel')!.style.display).toBe('none');
  });

  it('should add border-green class to webDiv when web is checked', () => {
    const webFormControl = component.form.get('web') as FormControl;
    webFormControl.setValue(true);
    expect(document.getElementById('webDiv')!.classList.contains('border-green')).toBe(true);
  });

  it('should remove border-green class from webDiv when web is unchecked', () => {
    const webFormControl = component.form.get('web') as FormControl;
    webFormControl.setValue(false);
    expect(document.getElementById('webDiv')!.classList.contains('border-green')).toBe(false);
  });

  it('should pages and idioms be 1 when web is unchecked', () => {
    const webFormControl = component.form.get('web') as FormControl;
    webFormControl.setValue(false);
    expect(budgetService.pages).toBe(1);
    expect(budgetService.idioms).toBe(1);
  });

  it('should increment pages and idioms when increment is called', () => {
    PComponent.increment('pages');
    expect(PComponent.panelForm.get('pages')?.value).toBe(2);

    PComponent.increment('idioms');
    expect(PComponent.panelForm.get('idioms')?.value).toBe(2);
  });

  it('should decrement pages and idioms when decrement is called', () => {
    PComponent.decrement('pages');
    expect(PComponent.panelForm.get('pages')?.value).toBe(1);

    PComponent.decrement('idioms');
    expect(PComponent.panelForm.get('idioms')?.value).toBe(1);
  });
});
