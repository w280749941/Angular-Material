import { Component, OnInit, HostBinding } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NewProjectComponent } from '../new-project/new-project.component';
import { InviteComponent } from '../invite/invite.component';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { slideToRight } from '../../anims/router.anim';
import { listAnimation } from '../../anims/list.anim';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  animations: [
    slideToRight,
    listAnimation,
  ]
})
export class ProjectListComponent implements OnInit {

  @HostBinding('@routeAnim') state;

  projects = [
    {
      'id': 1,
      'name': 'Enterprise Collaboration Platform',
      'desc': 'Enterprise project',
      'coverImg': 'assets/img/covers/0.jpg'
    },
    {
      'id': 2,
      'name': 'Automated Collaboration Platform',
      'desc': 'Automated project',
      'coverImg': 'assets/img/covers/1.jpg'
    }
  ];

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  openNewProjectDialog() {
    const dialogRef = this.dialog.open(NewProjectComponent, { data: { title: 'Create Project' } });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.projects = [...this.projects, { id: 3, name: 'A new project', desc: 'New project Desc', coverImg: 'assets/img/covers/8.jpg' }];
      this.projects = [...this.projects, {
        id: 4, name: 'Another new project',
        desc: 'Another new project Desc', coverImg: 'assets/img/covers/10.jpg'
      }];
    });
  }

  launchInviteDialog() {
    const dialogRef = this.dialog.open(InviteComponent);
  }

  launchUpdateDialog() {
    const dialogRef = this.dialog.open(NewProjectComponent, { data: { title: 'Edit Project' } });
  }

  launchConfirmDailog(project) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, { data: { title: 'Delete Project', content: 'Sure to do this?' } });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.projects = this.projects.filter(p => p.id !== project.id);
    });
  }
}
