import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableData } from '../../../@core/data/smart-table';
import {CustomRendererComponent} from './CustomRenderer/CustomRenderer.component';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './smart-table.component.html',
  styleUrls: ['./smart-table.component.scss'],
})
export class SmartTableComponent {

  settings = {
    columns: {
      id: {
        title: 'ID',
        type: 'number',
        filter: false
      },
      firstName: {
        title: 'Name',
        type: 'string',
        filter: false
      },
      username: {
        title: 'Runtime',
        type: 'string',
        filter: false
      },
      email: {
        title: 'Memory Allocated',
        type: 'string',
        filter: false
      },
      age: {
        title: 'Last Deployed',
        type: 'number',
        filter: false
      },
      pathID: {
        title: 'Logs',
        type: 'custom',
        renderComponent: CustomRendererComponent,
        filter: false 
      }
    },
    actions:{
      columnTitle:'Manage',
      position: 'right',
      add: false,
      edit: false,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    }
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: SmartTableData) {
    const data = this.service.getData();
    this.source.load(data);
  }

  onSearch(query: string = '') {
    this.source.setFilter([
      // fields we want to include in the search
      {
        field: 'firstName',
        search: query
      }
    ], false); 
    // second parameter specifying whether to perform 'AND' or 'OR' search 
    // (meaning all columns should contain search query or at least one)
    // 'AND' by default, so changing to 'OR' by setting false here
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
