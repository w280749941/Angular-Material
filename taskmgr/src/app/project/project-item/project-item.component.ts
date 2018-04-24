import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss']
})
export class ProjectItemComponent implements OnInit {

  @Input() item;

  @Output() omInvite = new EventEmitter<void>();
  @Output() omEdit = new EventEmitter<void>();
  @Output() omDel = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  onInviteClick() {
    this.omInvite.emit();
  }

  onEditClick() {
    this.omEdit.emit();
  }

  onDelClick() {
    this.omDel.emit();
  }
}
