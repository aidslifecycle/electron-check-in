import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { LoginService } from '../../services/login.service';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}

interface LoginResponse {
  signature: string;
  JSESSIONID: string;
  routing_id: string;
  nonce: string;
  cons_id: string;
  timestamp: string;
  token: string;
}

interface MatSelectChange {
  value: string[];
}

/** Constants used to fill up our data base. */
const COLORS: string[] = [
  'maroon',
  'red',
  'orange',
  'yellow',
  'green',
  'purple',
  'fuchsia',
  'lime',
  'teal',
  'aqua',
  'blue',
  'navy',
  'black',
  'gray'
];
const NAMES: string[] = [
  'Maia',
  'Olivia',
  'Jack',
  'Cora',
  'Levi',
  'Violet',
  'Arthur',
  'Mia',
  'Thomas',
  'Elizabeth'
];

/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-participant-search',
  styleUrls: ['participant-search.component.scss'],
  templateUrl: 'participant-search.component.html'
})
export class ParticipantSearchComponent implements OnInit {
  displayedColumns: string[] = ['number', 'name', 'location', 'team'];
  dataSource: MatTableDataSource<UserData>;
  toppings = new FormControl();
  login: Observable<LoginResponse>;
  toppingList: string[] = ['Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public ls: LoginService) {
    this.login = this.ls.login();
    // this.login.subscribe(response => {
    //   console.log(response);
    // });

    // Create 100 users
    const users = Array.from({ length: 100 }, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  myChange(change: MatSelectChange) {
    const value = change.value[0];
    if (!!value) {
      this.applyFilter(value);
    } else {
      this.applyFilter('');
    }
  }
}

/** Builds and returns a new User. */
function createNewUser(id: number): UserData {
  const name =
    NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
    ' ' +
    NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
    '.';

  return {
    id: id.toString(),
    name: name,
    progress: Math.round(Math.random() * 100).toString(),
    color: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
  };
}
