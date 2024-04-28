import { Component } from '@angular/core';
import { WelcomeComponent } from '../welcome/welcome.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [WelcomeComponent, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {
  form: FormGroup;
  presupuestoTotal = 0;
  precioSeo = 300;
  precioAds = 400;
  precioWeb = 500;

  constructor() {
    this.form = new FormGroup({
      'seo': new FormControl(false),
      'ads': new FormControl(false),
      'web': new FormControl(false)
    });

    this.form.get('seo')!.valueChanges.subscribe(checked => {
      this.presupuestoTotal += checked ? this.precioSeo : -this.precioSeo;
    });
    this.form.get('ads')!.valueChanges.subscribe(checked => {
      this.presupuestoTotal += checked ? this.precioAds : -this.precioAds;
    });
    this.form.get('web')!.valueChanges.subscribe(checked => {
      this.presupuestoTotal += checked ? this.precioWeb : -this.precioWeb;
    });
  }
}

