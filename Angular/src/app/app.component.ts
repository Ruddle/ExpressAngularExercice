import { Component, OnInit } from '@angular/core'
import { ContactService, Contact, ContactDetail } from './contact.service'
import { Observable } from 'rxjs/Observable'
import { SelectedComponent } from './selected.component'
import { ListComponent } from './list.component'
import { EditedComponent } from './edited.component'
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'

@Component({
  selector: 'app-root',
  template: `
      <p-panel header="Update or add contact">
           <contacts_edit> </contacts_edit>
      </p-panel>
      <p-panel header="List contact">
           <list></list>
      </p-panel>
      <p-panel header="Selected contact">
           <contacts> </contacts>
      </p-panel>
    ` 
})

export class AppComponent {
}
