import { Component } from '@angular/core';
import { ContactService, Contact, ContactDetail } from './contact.service'
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'contacts',
  template: `
  user : {{selectedContact?.username}} <br> password : {{selectedContact?.password}}
  `
})

export class SelectedComponent {
  selectedContact: ContactDetail;
  constructor(private service: ContactService) {
    service.selectedContact.subscribe((c) => this.selectedContact = c)
  }
}
