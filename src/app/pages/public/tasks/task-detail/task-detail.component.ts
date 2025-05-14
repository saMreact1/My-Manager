import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.css'
})
export class TaskDetailComponent {
  constructor(
    public dialogRef: MatDialogRef<TaskDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public task: any 
  ) {}

  ngOnInit() {
    console.log(this.task);
  }

  formatDate(date: string | Date | null): string {
    if(!date) return 'N/A';
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
  });
  return formattedDate;
  }

  close(): void {
    this.dialogRef.close();
  }

  getStatusColor(status: string): string {
    switch (status.toLowerCase()) {
      case 'Pending': return 'warn';
      case 'In-progress': return 'accent';
      case 'Completed': return 'primary';
      default: return '';
    }
  }  
}
