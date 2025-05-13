import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TaskService } from '../../../../core/services/task/task.service';
import { Task } from '../../../../model/task.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth/auth.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent implements OnInit {
  @Output() taskCreated = new EventEmitter<any>();
  @Output() closeForm = new EventEmitter<any>();

  taskForm: FormGroup; // FormGroup to manage the form controls
  taskFromDate: Date; // to store the date from the date picker
  taskToDate: Date; // to store the date from the date picker
  users: any = [];

  constructor(
    public authService: AuthService,
    private taskService: TaskService,
    private fb: FormBuilder // Injecting FormBuilder to create the form group
  ) {}

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      status: ['Pending'],
      priority: ['Low'],
      timeline: this.fb.group({
        startDate: [''],
        endDate: ['']
      }),
      assignedTo: ['']
    })
  }

  // Method to Create a Task
  createTask(): void {
    if(this.taskForm.invalid) {
      console.log('🚨 Form is invalid!');
      return;
    }
    const newTask = this.taskForm.value; // Get the form values
  
    console.log('📦 Submitting task:', newTask);
  
    this.taskService.createTask(newTask).subscribe({
      next: (task) => {
        console.log('✅ Task created:', task);
        this.taskCreated.emit(task); // Emit the new task to the parent component
        this.close(); // Reset the form after submission
      },
      error: (err) => {
        console.error('🚨 Error creating task:', err);
      }
    });
  }

  close() {
    this.closeForm.emit();
  }
}
