import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chartchild',
  templateUrl: './chartchild.component.html',
  styleUrls: ['./chartchild.component.css']
})
export class ChartchildComponent {
  sub: any;
  constructor(private route: ActivatedRoute) { }

  // ngOnInit() {
  //   this.sub = this.route
  //     .data
  //     .subscribe(v => console.log(v));
  // }

  // ngOnDestroy() {
  //   this.sub.unsubscribe();
  // }


  private sortableOptions: Boolean = false;



  public barChartType: String = 'bar';
  public barChartLegend: Boolean = true;


  // stacked
  public barChartData: any[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A', stack: '1' },
    { data: [42, 24, 71, 14, 31, 49, 30], label: 'Series C', stack: '2' }
  ];

  public barChartLabels: string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];

  public barChartOptions: any = {
    responsive: true,
    scales: {
      xAxes: [{
        stacked: true
      }],
      yAxes: [{
        stacked: true
      }]
    }
  };



  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  public randomize(): void {
    // Only Change 3 values
    const data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    const clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;
    /**
     * (My guess), for Angular to recognize the change in the dataset
     * it has to change the dataset variable directly,
     * so one way around it, is to clone the data, change it and then
     * assign it;
     */
  }
}
