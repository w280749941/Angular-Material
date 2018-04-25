import { Component, OnInit, Input, Output, EventEmitter, HostBinding, HostListener } from '@angular/core';
import { cardAnim } from '../../anims/card.anim';


@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss'],
  animations: [
    cardAnim,
  ]
})
export class ProjectItemComponent implements OnInit {

  @Input() item;

  @Output() omInvite = new EventEmitter<void>();
  @Output() omEdit = new EventEmitter<void>();
  @Output() omDel = new EventEmitter<void>();
  @HostBinding('@card') cardState = 'out'; // This is same as adding [@card]="cardState" in selector

  constructor() { }

  ngOnInit() {
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.cardState = 'hover';
  }

  @HostListener('mouseleave')
  onmouseleave() {
    this.cardState = 'out';
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
