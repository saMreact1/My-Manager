import { Component } from '@angular/core';
import { ChartData, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  // standalone: true,
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.css',
})
export class ChartsComponent {
  barChartOptions: ChartOptions = {
    responsive: true,
    animation: {
      duration: 1000,
      easing: 'easeOutBounce'
    },
    plugins: {
      legend: {
        display: true
      }
    }
  };

  barChartType: ChartType = 'bar';

  barChartData: ChartData<'bar'> = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [12, 19, 3, 5, 2, 3, 7],
        label: 'Tasks Completed',
        backgroundColor: '#42A5F5'
      }
    ]
  };
}
