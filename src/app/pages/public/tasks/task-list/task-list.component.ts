import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Task } from '../../../../model/task.model';
import { TaskService } from '../../../../core/services/task/task.service';
import { MatDialog } from '@angular/material/dialog';
import { TaskDetailComponent } from '../task-detail/task-detail.component';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = []
  // showTaskForm: boolean = false
  isExpanded: boolean = true

  constructor(
    private taskService: TaskService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getTasks();
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['tasks']) {
      console.log('Task updated:', this.tasks);
    }
  }

  // saveTasks() {
  //   localStorage.setItem('tasks', JSON.stringify(this.tasks));
  // }
  // loadTasks() {
  //   if (typeof window !== 'undefined' && localStorage) {
  //     const storedTasks = localStorage.getItem('tasks');
  //     this.tasks = storedTasks ? JSON.parse(storedTasks) : [];
  //   }
  // }

  createTask(newTask: Task) {
    this.tasks.push(newTask)
  }

  toggleTasks() {
    this.isExpanded = !this.isExpanded;
  }

  onStatusChange(event: Event, task: Task) {
    const selectElement = event.target as HTMLSelectElement;
    const newStatus = selectElement.value;
    
    const updatedTask = { ...task, status: newStatus };

    this.taskService.updateTask(updatedTask).subscribe({
      next: (res) => {
        task.status = newStatus; // Optimistically update
        console.log('✅ Task status updated:', res);
      },
      error: (err) => {
        console.error('❌ Failed to update task status:', err);
      }
    })
  }

  showTaskForm() {
    this.dialog.open(TaskFormComponent, {
      data: {mode: 'create'},
      width: '400px',
      autoFocus: true,
      disableClose: false,
      restoreFocus: true
    });
    console.log('form opened');
    
  }

  openTask(task: Task) {
    this.dialog.open(TaskDetailComponent, {
      data: task,
      width: '500px',
      autoFocus: true,
      disableClose: false,
      restoreFocus: true,
    });
    console.log('Task sent to modal:', task);
  }

  delTask(task: Task) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent);
    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        if (!task || !task._id) {
          console.error("❌ No valid task ID to delete:", task);
          return;
        }
  
        this.taskService.deleteTask(task._id).subscribe({
          next: () => {
            console.log(`✅ Task ${task._id} deleted`);
            this.getTasks(); // Refresh list
          },
          error: err => {
            console.error('❌ Failed to delete task:', err);
          }
        });
      }
    });
  }

  getTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (data: Task[]) => {
        this.tasks = data;
      },
      error: (err) => {
        console.error('Failed to fetch tasks:', err);
      }
    });
  }
}
