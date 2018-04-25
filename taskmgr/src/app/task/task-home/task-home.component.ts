import { Component, OnInit, HostBinding } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NewTaskComponent } from '../new-task/new-task.component';
import { CopyTaskComponent } from '../copy-task/copy-task.component';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { NewTaskListComponent } from '../new-task-list/new-task-list.component';
import { slideToRight } from '../../anims/router.anim';

@Component({
  selector: 'app-task-home',
  templateUrl: './task-home.component.html',
  styleUrls: ['./task-home.component.scss'],
  animations: [
    slideToRight,
  ]
})
export class TaskHomeComponent implements OnInit {

  @HostBinding('@routeAnim') state;

  lists = [
    {
      id: 1,
      name: 'waiting',
      tasks: [
        {
          id: 1,
          desc: 'Task 1: buy starbucks coffee for someone',
          completed: true,
          priority: 3,
          owner: {
            id: 1,
            name: 'mike',
            avatar: 'avatars:svg-11'
          },
          dueDate: new Date(),
          reminder: new Date(),
        },
        {
          id: 2,
          desc: 'Task 2: home work',
          completed: true,
          priority: 2,
          owner: {
            id: 2,
            name: 'Eric',
            avatar: 'avatars:svg-12'
          },
          dueDate: new Date(),
        }
      ]
    },
    {
      id: 2,
      name: 'ongoing',
      tasks: [
        {
          id: 3,
          desc: 'Task 3: Play games',
          completed: false,
          priority: 1,
          owner: {
            id: 3,
            name: 'Luke',
            avatar: 'avatars:svg-13'
          },
          dueDate: new Date(),
        },
        {
          id: 4,
          desc: 'Task 4: Jump around',
          completed: false,
          priority: 2,
          owner: {
            id: 4,
            name: 'John',
            avatar: 'avatars:svg-14'
          },
          dueDate: new Date(),
        }
      ]
    }
  ];

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  launchNewTaskDialog() {
    const dialogRef = this.dialog.open(NewTaskComponent, {data: {title: 'Create Task: '}});
  }

  launchCopyTaskDialog() {
    const dialogRef = this.dialog.open(CopyTaskComponent, {data: {lists: this.lists}});
  }

  launchUpdateTaskDialog(task) {
    const dialogRef = this.dialog.open(NewTaskComponent, {data: {title: 'Edit Task: ', task: task}});
  }

  launchConfirmDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {data: {title: 'Delete List', content: 'Sure to do this?'}});
    dialogRef.afterClosed().subscribe(result => console.log(result));
  }

  launchEditListDialog() {
    const dialogRef = this.dialog.open(NewTaskListComponent, {data: {title: 'Edit List Name'}});
    dialogRef.afterClosed().subscribe(result => console.log(result));
  }

  launchNewListTaskDialog() {
    const dialogRef = this.dialog.open(NewTaskListComponent, {data: {title: 'Create List'}});
    dialogRef.afterClosed().subscribe(result => console.log(result));
  }

}
