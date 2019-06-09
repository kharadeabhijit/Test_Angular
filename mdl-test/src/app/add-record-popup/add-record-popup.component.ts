import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { BsModalRef } from 'ngx-bootstrap/modal';

import { AppFetchRecordService } from '../app-fetch-record-service/app-fetch-record.service';


@Component({
  selector: 'add-record-popup',
  templateUrl: './add-record-popup.component.html',
  styleUrls: ['./add-record-popup.component.scss']
})
export class AddRecordPopupComponent implements OnInit {

  private title: string = "Add Column";
  form: FormGroup;
  columnName = "";
  columnTypes = [];
  editables = [];
  submitted = false;
 
  constructor(public bsModalRef: BsModalRef, private formBuilder: FormBuilder,  private fetchRecordService:AppFetchRecordService) {
        
  }
 
  ngOnInit() {
    this.form = this.formBuilder.group({
      columnName: ["", Validators.required],
      columnType: ["", Validators.required],
      editable: ["", Validators.required]
    });

    of(this.getColumnType()).subscribe(type => {
      this.columnTypes = type;
      this.form.controls.columnType.patchValue(this.columnTypes[0].id);
    });

    of(this.getEditable()).subscribe(isEditable => {
      this.editables = isEditable;
      this.form.controls.editable.patchValue(this.editables[0].id);
    });
  }

  getColumnType() {
    return [
      { id: "", type: "Select column type" },
      { id: "String", type: "String" },
      { id: "Number", type: "Number" },
      { id: "Boolean", type: "Boolean" },
      { id: "Date", type: "Date" }
    ];
  }

  getEditable() {
    return [
      { id: "", isEditable: "Select editable" },
      { id: "True", isEditable: "True" },
      { id: "False", isEditable: "False" }
    ];
  }

  get formControlEements() { return this.form.controls; }

  submit() {
    this.submitted = true;        
    if (this.form.invalid) {
      console.log(this.form.invalid+" invalid");
        return;
    }
  
    this.fetchRecordService.addRecord(this.form.value);
    this.closeModal();
  }


  private closeModal(){
    this.bsModalRef.hide();
  }

  private cancelRecord(){
    this.closeModal();
  }
}