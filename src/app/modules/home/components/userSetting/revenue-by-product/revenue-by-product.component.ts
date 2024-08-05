import { Component, OnInit } from '@angular/core';
import { ProductsRevenuesExpanded } from 'src/app/types/expanded-revenues';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { GResult, Result } from 'src/app/types/result';
import { AlertService } from 'src/app/modules/infra/services/alert.service';

@Component({
  selector: 'app-revenue-by-product',
  templateUrl: './revenue-by-product.component.html',
  styleUrls: ['./revenue-by-product.component.css']
})
export class RevenueByProductComponent implements OnInit {

  root: string = environment.rootUrl;
  add: boolean = false;
  newProductsRevenues: ProductsRevenuesExpanded = new ProductsRevenuesExpanded();
  list: ProductsRevenuesExpanded[];

  constructor(private http: HttpClient, private alert: AlertService) { }

  ngOnInit(): void {
    this.getRevenues();
  }

  changeAdd() {
    this.add = !this.add;
  }

  getRevenues() {
    this.http.get(this.root + 'ExpandedRevenuesSetting/GetProductsRevenuesExpanded').subscribe((res: GResult<ProductsRevenuesExpanded[]>) => {
      this.list = res.value;
    });
  }

  addRevenue() {
    this.http.post(this.root + 'ExpandedRevenuesSetting/AddAmountRevenue', this.newProductsRevenues).subscribe((res: Result) => {
      this.getRevenues();
      this.add = !this.add;
      this.newProductsRevenues = new ProductsRevenuesExpanded();
    });
  }

  editRevenue(i: ProductsRevenuesExpanded) {
    this.list.forEach(item => {
      if (item.productId == i.productId) {
        item.inEdit = true;
      }
      else {
        item.inEdit = false;
      }
    });
  }

  save(revenue: ProductsRevenuesExpanded) {
    revenue.inEdit = false;
    this.http.put(this.root + 'ExpandedRevenuesSetting/UpdateAmountRevenue', revenue).subscribe((res: Result) => {
      if (res.success) {
        this.alert.success("ההכנסה עודכנה בהצלחה!")
        revenue.inEdit = false;
      }
      else {
        this.alert.error("קיימת כזאת הכנסה במערכת...")
        revenue.inEdit = true
      }
      this.getRevenues();
    })
  }

  cancel(i: ProductsRevenuesExpanded) {
    i.inEdit = false;
    this.getRevenues();
  }

  deleteRevenue(id: number) {
    this.alert.remove("האם אתה בטוח שאתה רוצה למחוק?").then((Result) => {
      if (Result.isConfirmed == true) {
        this.http.delete(this.root + 'ExpandedRevenuesSetting/DeleteAmountRevenue/' + id).subscribe((res: Result) => {
          if (res.success) {
            this.alert.success("ההכנסה נמחקה בהצלחה!");
          }
          this.getRevenues();
        });
      }
    });
  }

}
