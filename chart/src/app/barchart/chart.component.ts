import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent {

  @ViewChild(BaseChartDirective)
  public chart: BaseChartDirective;
  public barChartType: String = 'bar';
  public barChartLegend: Boolean = true;
  public barChartData: any[] = [
    { data: [20, 30, 60, 40, 50, 35, 25, 34, 44, 15, 28, 15, 5, 45], label: 'Uspesne', stack: '1' },
    { data: [2, 3, 4, 5, 9, 8, 7, 6, 12, 16, 9, 14, 2, 3], label: 'Rozpracovane', stack: '1' },
    { data: [20, 23, 21, 26, 22, 1, 17, 26, 27, 29, 14, 15, 22, 27], label: 'Ostatne', stack: '1' }
  ];

  public barChartLabels: string[] = ['ked je dlhsi-->pica', 'MF', 'MH', 'MK', 'MO', 'b', 'c', 'MS', 'd', 'MV', 'e', 'MZ', 'MZP'];

  public barChartOptions: any = {
    responsive: true,
    legend: {
      display: false
    },
    scales: {
      xAxes: [{
        stacked: true
      }],
      yAxes: [{
        stacked: true,
        display: false
      }]
    }
  };

  public chartHovered(e: any): void {
    console.log(e);
  }

  public chartClicked(e: any): void {
    console.log(e);
    // console.log('Adam je super projektak a grafy su este viac supernejsie');
  }

  public onSort() {
    this.sorting(this.barChartData[0].data, this.barChartLabels);

  }

  private sorting(data, label) {
    // 1) combine the arrays:
    let list = [];
    for (let j = 0; j < data.length; j++) {
      list.push({ 'name': data[j], 'age': label[j] });
    }

    // 2) sort:
    list.sort(function (a, b) {
      return ((a.name < b.name) ? -1 : ((a.name == b.name) ? 0 : 1));
    });

    // 3) separate them back out:
    for (let k = 0; k < list.length; k++) {
      data[k] = list[k].name;
      label[k] = list[k].age;
    }
    this.chart.chart.update();
  }

}
