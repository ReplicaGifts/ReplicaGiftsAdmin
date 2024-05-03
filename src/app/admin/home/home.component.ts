import { Component } from '@angular/core';
import { RouterService } from '../../service/router.service';
import { Router } from '@angular/router';
import { ChartService } from '../../service/chart.service';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderViewTableComponent } from '../order-view-table/order-view-table.component';
import { GiftViewTableComponent } from '../gift-view-table/gift-view-table.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BaseChartDirective, CommonModule, FormsModule, CurrencyPipe, OrderViewTableComponent, GiftViewTableComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {


  constructor(private routerService: RouterService, private chartService: ChartService, private router: RouterService, private _router: Router) {
    this.routerService.setRoute('home');
  }


  today_sales = 0;
  monthly_sales = 0;
  today_sales_amt = 0;
  monthly_sales_amt = 0;
  total_sales = 0;

  out_of_stock: any[] = [];
  return_order: any[] = [];

  selected_interval = 'month';

  selected_month = 0;
  selected_year = 0;
  recent_order: any[] = [];
  gifts_: any[] = [];

  Allmonth = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  month = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  years: any[] = []

  initYears() {
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= 2020; year--) {
      this.years.push(year);
    }
  }

  week = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: this.week,
    datasets: [
      {
        data: [],
        label: 'Weekly Sales',
        borderColor: 'rgba(255, 99, 132, 1)',
        pointBackgroundColor: 'rgba(255, 99, 132, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(255, 99, 132, 0.8)',
        tension: 0,
        backgroundColor: 'rgba(255, 99, 132, 0.1)',
        borderWidth: 2,
      }
    ]
  };


  pieChartData: ChartConfiguration<'doughnut'>['data'] = {
    labels: [
      'Today sales',
      'Month sales',
    ],
    datasets: [{
      label: 'No of sales',
      data: [],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 205, 86)'
      ],
      hoverOffset: 4
    }]
  }


  lineChartOptions: ChartOptions<'line'> = {
    responsive: false,
    plugins: {
      legend: {
        labels: {
          color: 'black',
          font: {
            size: 14
          }
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        titleFont: {
          size: 14,
          weight: 'bold'
        },
        bodyFont: {
          size: 12
        }
      }
    },
    animation: {
      duration: 1000,
      easing: 'easeInOutQuart',
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: 'black',
          font: {
            size: 12,
          }
        },

        title: {
          display: true,
          text: ''
        }
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: 'black',
          font: {
            size: 12,
          },
          callback: function (value) {
            return value;
          }
        },
        title: {
          display: true,
          text: 'No.of. Sales'
        }

      }
    }
  };

  pieChartOptions: ChartOptions<'doughnut'> = {
    responsive: false,
  }

  public lineChartLegend = true;

  ngOnInit() {
    this.initYears();
    // Set default selected year and month
    this.selected_year = new Date().getFullYear();
    this.selected_month = new Date().getMonth();
    this.updateChart(); // Default to weekly data
    this.chartService.today_sale().subscribe((data: any) => {
      this.today_sales = data.totalSales;
      this.today_sales_amt = data.totalAmount;
      this.chartService.monthly_sale().subscribe((data: any) => {
        this.monthly_sales = data.totalSales;
        this.monthly_sales_amt = data.totalAmount;
        console.log(data)

        this.pieChartData = {
          datasets: [{
            data: [this.today_sales, this.monthly_sales],
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 205, 86)'
            ],
          }]
        }
      });
    });
    this.chartService.totalSales_amt().subscribe((data: any) => {
      console.log(data)
      this.total_sales = data.totalSales[0].totalAmount;
    });

  }


  async cutFutureMonth() {
    if (this.selected_year === new Date().getFullYear()) {
      this.month = this.month.slice(0, new Date().getMonth() + 1);
    } else {
      this.month = [...this.Allmonth]
    }
  }

  async updateChart() {
    let labels: string[];
    let data: number[];
    console.log(this.selected_year);

    await this.cutFutureMonth();
    if (this.selected_interval === 'month') {

      const fromDate = new Date(); // Get the current date and time
      fromDate.setMonth(this.selected_month);
      console.log(fromDate)
      fromDate.setFullYear(+this.selected_year);
      console.log(fromDate, this.selected_year)
      const interval = 'month'; // Set the interval type (year, month, etc.)
      this.chartService.sales_chart({ fromDate: fromDate.getTime(), interval: interval }).subscribe((data1: any) => {


        console.log("month :", data1);
        labels = data1.map((la: any) => la.date
        );
        data = data1.map((da: any) => da.count);
        // Process the data as needed
        this.lineChartData = {
          labels: labels,
          datasets: [{
            data: data,
            label: 'Sales',
            borderColor: 'rgba(255, 99, 132, 1)',
            pointBackgroundColor: 'rgba(255, 99, 132, 1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(255, 99, 132, 0.8)',
            tension: 0,
            backgroundColor: 'rgba(255, 99, 132, 0.1)',
            borderWidth: 2,
          }]

        };
        let label = this.lineChartOptions;
        if (label.scales) {
          if (label.scales['x']?.title) {
            let tit = label.scales['x']?.title;
            tit.text = this.selected_interval === 'month' ? this.month[this.selected_month] : this.selected_year.toString()
          }
        }


      });
    } else if (this.selected_interval === 'year') {

      const fromDate = new Date(); // Get the current date and time
      fromDate.setFullYear(+this.selected_year);
      this.chartService.sales_chart({ fromDate: fromDate.getTime(), interval: this.selected_interval }).subscribe((data1: any) => {

        console.log(data1);
        labels = data1.map((data2: any) => {
          let month = this.month[data2.month]
          return month;
        });
        data = data1.map((d: any) => d.count)
        this.lineChartData = {
          labels: labels,
          datasets: [{
            data: data,
            label: this.selected_interval === 'year' ? 'Yearly Sales' : 'Sales',
            borderColor: 'rgba(255, 99, 132, 1)',
            pointBackgroundColor: 'rgba(255, 99, 132, 1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(255, 99, 132, 0.8)',
            tension: 0,
            backgroundColor: 'rgba(255, 99, 132, 0.1)',
            borderWidth: 2,
          }]
        };
        let label = this.lineChartOptions;
        if (label.scales) {
          if (label.scales['x']?.title) {
            let tit = label.scales['x']?.title;
            tit.text = this.selected_interval === 'month' ? this.month[this.selected_month] : this.selected_year.toString()
          }
        }
      });
    }

  }



  // getReturn() {
  //   this.order.getAllreturn().subscribe(res => { this.return_order = res; console.log(res) })
  // }


  ngAfterViewInit() {
    this.getOrder();
    this.gifts();
  }

  getOrder() {
    this.chartService.recent_order().subscribe((data: any) => {
      this.recent_order = data;
    });
  }

  gifts() {
    this.chartService.outofstockGift().subscribe((data: any) => {
      console.log(data);
      this.gifts_ = data;
    });
  }

  navToReturn() {
    this._router.navigateByUrl(`/admin/ordered-products?returned=true`)
  }

}
