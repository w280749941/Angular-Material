import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NewProjectComponent } from '../new-project/new-project.component';
import { InviteComponent } from '../invite/invite.component';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  projects = [
    {
      'name': 'Enterprise Collaboration Platform',
      'desc': 'Enterprise project',
      'coverImg': 'assets/img/covers/0.jpg'
    },
    {
      'name': 'Automated Collaboration Platform',
      'desc': 'Automated project',
      'coverImg': 'assets/img/covers/1.jpg'
    }
  ];

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  openNewProjectDialog() {
    const dialogRef = this.dialog.open(NewProjectComponent, {data: {title: 'Create Project'}});
    dialogRef.afterClosed().subscribe(result => console.log(result));
  }

  launchInviteDialog() {
    const dialogRef = this.dialog.open(InviteComponent);
  }

  launchUpdateDialog() {
    const dialogRef = this.dialog.open(NewProjectComponent, {data: {title: 'Edit Project'}});
  }

  launchConfirmDailog() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {data: {title: 'Delete Project', content: 'Sure to do this?'}});
    dialogRef.afterClosed().subscribe(result => console.log(result));
  }
}
