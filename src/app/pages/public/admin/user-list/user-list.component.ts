import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

interface User {
  _id: string;        // or 'id' depending on your backend
  name: string;
  email: string;
  role: string;
  createdAt?: string; // Optional if you have it
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {

  displayedColumns: string[] = ['name', 'email', 'role', 'createdAt'];
  dataSource = new MatTableDataSource<any>([]);
  users: User[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:3000/admin/users').subscribe(users => {
      this.dataSource.data = users;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })

    this.fetchUsers()
  }

  fetchUsers() {
    this.http.get<User[]>('http://localhost:3000/admin/users')
      .subscribe(users => {
        this.users = users;
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getRoleColor(role: string): string {
    switch (role.toLowerCase()) {
      case 'admin':
        return 'primary'; // Use Angular Material's "primary" color for Admin
      case 'member':
        return 'accent'; // Use "accent" color for Members
      default:
        return 'warn'; // Use "warn" color for undefined roles
    }
  }
}
