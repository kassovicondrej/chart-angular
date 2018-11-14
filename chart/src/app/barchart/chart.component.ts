import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {




  @ViewChild(BaseChartDirective)
  public chart: BaseChartDirective;

  public barChartType: String = 'roundedBar';
  public barChartLegend: Boolean = true;
  public barChartData: any[] = [
    { data: [20, 30, 60, 40, 50, 35, 25, 34, 44, 15, 28, 15, 5, 45], label: 'Uspesne', stack: '1', backgroundColor: '#18afac' },
    { data: [2, 3, 4, 5, 9, 8, 7, 6, 12, 16, 9, 14, 2, 3], label: 'Rozpracovane', stack: '1', backgroundColor: '#b2e4e3' },
    { data: [20, 23, 21, 26, 22, 1, 17, 26, 27, 29, 14, 15, 22, 27], label: 'Ostatne', stack: '1', backgroundColor: '#fff' }
  ];

  public barChartLabels: string[] = ['LM', 'MF', 'MH', 'MK', 'MO', 'b', 'c', 'MS', 'd', 'MV', 'e', 'MZ', 'MZP'];

  public barChartOptions: any = {
    responsive: true,
    barRoundness: 1.1,
    legend: {
      display: true
    },
    multiTooltipTemplate: '<%= datasetLabel %> - <%= value %>',
    tooltips: {
      mode: 'label'
    },
    scales: {
      xAxes: [{
        stacked: true,
        barThickness: 16,
      }],
      yAxes: [{
        stacked: true,
        display: false,
        ticks: {
          beginAtZero: true,
        }
      }]
    }
  };
  private colors = [
    '#63b598',
    '#ce7d78',
    '#ea9e70',
  ];

  constructor(private router: Router) {}
  ngOnInit() {
  }


  public chartHovered(e: any): void {
    console.log(e);
  }

  public chartClicked(e: any): void {
    console.log(e);
    this.router.navigateByUrl('/chartchild');
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


// roudned bars
declare var Chart: any;

( Chart as any ).helpers.drawRoundedTopRectangle = function(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
};

( Chart as any ).elements.RoundedTopRectangle = ( Chart as any ).elements.Rectangle.extend({
  draw: function() {
    const ctx = this._chart.ctx;
    const vm = this._view;
    let left, right, top, bottom, signX, signY, borderSkipped;
    let borderWidth = vm.borderWidth;

    if (!vm.horizontal) {
      // bar
      left = vm.x - vm.width / 2;
      right = vm.x + vm.width / 2;
      top = vm.y;
      bottom = vm.base;
      signX = 1;
      signY = bottom > top? 1: -1;
      borderSkipped = vm.borderSkipped || 'bottom';
    } else {
      // horizontal bar
      left = vm.base;
      right = vm.x;
      top = vm.y - vm.height / 2;
      bottom = vm.y + vm.height / 2;
      signX = right > left? 1: -1;
      signY = 1;
      borderSkipped = vm.borderSkipped || 'left';
  }

  // Canvas doesn't allow us to stroke inside the width so we can
  // adjust the sizes to fit if we're setting a stroke on the line
  if (borderWidth) {
    // borderWidth shold be less than bar width and bar height.
    const barSize = Math.min(Math.abs(left - right), Math.abs(top - bottom));
    borderWidth = borderWidth > barSize? barSize: borderWidth;
    const halfStroke = borderWidth / 2;
    // Adjust borderWidth when bar top position is near vm.base(zero).
    const borderLeft = left + (borderSkipped !== 'left'? halfStroke * signX: 0);
    const borderRight = right + (borderSkipped !== 'right'? -halfStroke * signX: 0);
    const borderTop = top + (borderSkipped !== 'top'? halfStroke * signY: 0);
    const borderBottom = bottom + (borderSkipped !== 'bottom'? -halfStroke * signY: 0);
    // not become a vertical line?
    if (borderLeft !== borderRight) {
      top = borderTop;
      bottom = borderBottom;
    }
    // not become a horizontal line?
    if (borderTop !== borderBottom) {
      left = borderLeft;
      right = borderRight;
    }
  }

  // calculate the bar width and roundess
  const barWidth = Math.abs(left - right);
  const roundness = this._chart.config.options.barRoundness || 0.5;
  const radius = barWidth * roundness * 0.5;

  // keep track of the original top of the bar
  const prevTop = top;

  // move the top down so there is room to draw the rounded top
  top = prevTop + radius;
  const barRadius = top - prevTop;

  ctx.beginPath();
  ctx.fillStyle = vm.backgroundColor;
  ctx.strokeStyle = vm.borderColor;
  ctx.lineWidth = borderWidth;

  // draw the rounded top rectangle
  ( Chart as any ).helpers.drawRoundedTopRectangle(ctx, left, (top - barRadius - 15), barWidth, bottom - prevTop + 15, barRadius );

  ctx.fill();
  if (borderWidth) {
    ctx.stroke();
  }

  // restore the original top value so tooltips and scales still work
  top = prevTop;
},
});

( Chart as any ).defaults.roundedBar = ( Chart as any ).helpers.clone(( Chart as any ).defaults.bar);

( Chart as any ).controllers.roundedBar = ( Chart as any ).controllers.bar.extend({
  dataElementType: ( Chart as any ).elements.RoundedTopRectangle
});
