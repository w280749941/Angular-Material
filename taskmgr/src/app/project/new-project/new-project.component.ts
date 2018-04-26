import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss']
})
export class NewProjectComponent implements OnInit {

  title = '';
  coverImages = [];
  form: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) private data,
    private dialogRef: MatDialogRef<NewProjectComponent>, private fb: FormBuilder) { }

  ngOnInit() {
    this.coverImages = this.data.thumbnails;
    // Check whether it's update or create
    if (this.data.project) {
      this.form = this.fb.group({
        name: [this.data.project.name, Validators.required],
        desc: [this.data.project.desc],
        coverImg: [this.data.project.coverImg]
      });
      this.title = 'Edit Project';
    } else {
      this.form = this.fb.group({
        name: ['', Validators.required],
        desc: [],
        coverImg: [this.data.img]
      });
      this.title = 'Create Project';
    }
    this.title = this.data.title;
    console.log(JSON.stringify(this.data));
  }

  onSubmit({value, valid}, ev: Event) {
    if (!valid) {
      return;
    }
    this.dialogRef.close(value);
  }
}
