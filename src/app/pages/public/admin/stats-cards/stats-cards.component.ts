import { Component, Input, OnInit } from '@angular/core';
import { StatsService } from '../../../../core/services/stats/stats.service';

@Component({
  selector: 'app-stats-cards',
  templateUrl: './stats-cards.component.html',
  styleUrl: './stats-cards.component.css'
})
export class StatsCardsComponent implements OnInit {

  // stats = [
  //   { icon: 'group', label: 'Users', value: 87, color: '#42a5f5' },
  //   { icon: 'task', label: 'Tasks', value: 239, color: '#66bb6a' },
  //   { icon: 'check_circle', label: 'Completed', value: 192, color: '#ffa726' },
  //   { icon: 'trending_up', label: 'Active Tasks', value: 47, color: '#ef5350' }
  // ];
  
  stats: any[] = [];

  constructor(private statsService: StatsService) {}

  ngOnInit(): void {
    this.statsService.getTaskStats().subscribe(data => {
      this.stats = [
        {
          icon: 'group',
          label: 'Users',
          value: 10,
          color: '#42a5f5'
        },
        {
          icon: 'task',
          label: 'Tasks',
          value: `${data.total}`,
          color: '#0564b3'
        },
        {
          icon: 'pending',
          label: 'Pending',
          value: `${data.pending}/${data.total}`,
          color: '#ef5350'
        },
        {
          icon: 'autorenew',
          label: 'In Progress',
          value: `${data.inProgress}/${data.total}`,
          color: '#ffa726'
        },
        {
          icon: 'check_circle',
          label: 'Completed',
          value: `${data.done}/${data.total}`,
          color: '#66bb6a'
        },
      ]
    })
  }

}
