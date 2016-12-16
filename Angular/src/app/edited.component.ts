import { Component, OnInit } from '@angular/core';
import { ContactService, Contact, ContactDetail } from './contact.service'
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'contacts_edit',
  template: `
<div class="ui-g">
    <form [formGroup]="myForm" novalidate (ngSubmit)="save(myForm.value, myForm.valid)">
      <div class="ui-grid ui-grid-responsive ui-grid-pad">
  
          <!-- We'll add our form controls here -->
          <div class="ui-grid-row">
           <div class="ui-g-12 ui-md-3">
            <label>Name</label>
            <input pInputText type="text" formControlName="username">
            <small [hidden]="myForm.controls.username.valid || (myForm.controls.username.pristine && !submitted)">
              Name is required (minimum 5 characters).
            </small>
            </div>
          </div>
          <div class="ui-grid-row">
           <div class="ui-g-12 ui-md-3">
            <label>Password</label>
            <input pInputText  type="text" formControlName="password">
            <small [hidden]="myForm.controls.password.valid || (myForm.controls.password.pristine && !submitted)">
              Password is required (minimum 5 characters).
            </small>
            </div>
          </div>  

          
            <div class="ui-grid-row">
             <button pButton type="submit" icon="fa-check" label="Submit"></button>
          </div>  
    </div>
      </form>
    </div>
  `
})

export class EditedComponent {
  public myForm: FormGroup; // our model driven form
  public submitted: boolean; // keep track on whether form is submitted
  public events: any[] = []; // use later to display form changes
  contacts: Contact[];
  selectedContact: ContactDetail;

  constructor(private service: ContactService, private _fb: FormBuilder) {
    service.listContacts.subscribe(c => { this.contacts = c })
    service.selectedContact.subscribe((c) => {
      this.selectedContact = c
      this.myForm.setValue({
        username: this.selectedContact.username,
        password: this.selectedContact.password
      });

    })
    service.getAllContacts()
  }

  ngOnInit() {
    this.myForm = new FormGroup({
      username: new FormControl('', [<any>Validators.required, <any>Validators.minLength(5)]),
      password: new FormControl('', [<any>Validators.required, <any>Validators.minLength(5)])
    });
  }

  save(model: ContactDetail, isValid: boolean) {
    this.submitted = true; // set form submit to true
    // check if model is valid
    // if valid, call API to save customer
    console.log(model, isValid);
    if (isValid) {

      if (this.contacts.filter(x => x.username == model.username).length == 0)
        this.service.postContact({ username: model.username, password: model.password })
      else
        this.service.putContact({ username: model.username, password: model.password })
    }
  }
}
