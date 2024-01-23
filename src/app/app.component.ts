import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currensy = '$';
  form = this.fb.group({
    order: ['', Validators.required],
    name: ['', Validators.required],
    phone: ['', Validators.required],
  })

  productsData: any;

  constructor(private fb: FormBuilder, private appService: AppService) {

  }
  ngOnInit() {
    this.appService.getData().subscribe(data => this.productsData = data)
  }

  scrollTo(target: HTMLElement, burger?: any) {
    target.scrollIntoView({ behavior: "smooth" });
    if (burger) {
      this.form.patchValue({ order: burger.title + ' (' + burger.price + ' ' + this.currensy + ')' });
    }
  }

  confirmOrder() {
    if (this.form.valid) {
      this.appService.sendOrder(this.form.value)
        .subscribe(
          {
            next: (response: any) => {
              alert(response.message)
              this.form.reset();
            },
            error: (response) => {
              alert(response.error.message)
            },
          }
        );
    }
  }


  changeCurrency() {
    let newCurrency = "$";
    let coefficient = 1;
    if (this.currensy === "$") {
      newCurrency = "₽";
      coefficient = 80;
    } else if (this.currensy === "₽") {
      newCurrency = "BYN";
      coefficient = 3;
    } else if (this.currensy === "BYN") {
      newCurrency = "€";
      coefficient = 0.9;
    } else if (this.currensy === "€") {
      newCurrency = "¥";
      coefficient = 6.9;
    }
    this.currensy = newCurrency;
    this.productsData.forEach((item: any) => {
      item.price = +(item.basePrice * coefficient).toFixed(1);
    })
  }
}
