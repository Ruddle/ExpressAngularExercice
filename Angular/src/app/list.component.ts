import { Component } from '@angular/core';
import { ContactService, Contact, ContactDetail } from './contact.service'
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'list',
  template: `
  <div class="ui-g">
  <div class="ui-g-12 ">
  <p-dataGrid [value]="contacts">
    <template let-c>
        <div class="ui-g-2 ">
            <div class="ui-g-12 "(click)="selectOther(c)"> 
                  <p-panel header="{{(c.username)}}">
                  <div class="ui-g ">
                <div class="ui-g-6"> <button pButton icon="fa-pencil-square-o"  (click)="selectOther(c)"></button> </div>
                <div class="ui-g-6"><button pButton class="ui-g-6"  icon="fa-trash" class="ui-button-danger" (click)="delete(c)"></button></div>
                  </div>
                </p-panel>
            </div>
        </div>
    </template>
</p-dataGrid>
</div>
  <div class="ui-g-12">
      <button pButton  icon="fa-trash" class="ui-button-danger" label="Delete All" (click)="deleteAll(c)"></button>
      <button pButton  icon="fa-database" label="Add Some" (click)="addSome(c)"></button>
  </div>
  </div>
  `
})

export class ListComponent {
  contacts: Contact[];
  constructor(private service: ContactService) {
    service.listContacts.subscribe(c => this.contacts = c)
    service.getAllContacts()
  }

    selectOther(event) {
    console.log(event)
    this.service.getContact(event.username)
  }

    delete(event) {
    console.log(event)
    this.service.deleteContact(event.username)
  }

  deleteAll() {
    this.contacts.forEach(element => {
      this.service.deleteContact(element.username)
    });
  }

    addSome() {

    for(var i =0; i<FAKE_USER.length;i++ )
    this.service.postContact({ username: FAKE_USER[i].username, password: FAKE_USER[i].password })
  }



}

const FAKE_USER :ContactDetail[]= [
	{"username": "Snow, Lavinia K.", "password": "tellus lorem eu metus. In"},
	{"username": "Brennan, Theodore U.", "password": "sed pede. Cum sociis"},
	{"username": "Guerrero, Urielle A.", "password": "Nullam enim. Sed nulla ante,"},
	{"username": "Sanders, Tanya I.", "password": "augue eu tellus. Phasellus"},
	{"username": "Medina, Amelia V.", "password": "nunc est, mollis non,"},
	{"username": "Camacho, Jennifer Q.", "password": "massa. Quisque porttitor eros nec"},
	{"username": "Cantrell, Colleen K.", "password": "cubilia Curae; Donec tincidunt. Donec"},
	{"username": "Bright, Carl B.", "password": "Maecenas malesuada fringilla est. Mauris"},
	{"username": "Cervantes, Aurora T.", "password": "cursus vestibulum. Mauris magna. Duis"},
	{"username": "Ayala, Nichole N.", "password": "penatibus et magnis dis parturient"},
	{"username": "Briggs, Georgia A.", "password": "arcu. Aliquam ultrices iaculis odio."},
	{"username": "Padilla, Wilma S.", "password": "molestie arcu. Sed eu nibh"},
	{"username": "Floyd, Mannix P.", "password": "ac mattis ornare, lectus"},
];
