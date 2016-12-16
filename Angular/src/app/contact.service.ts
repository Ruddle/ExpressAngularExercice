import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/publish';

export class Contact {

  username: string;
}

export class ContactDetail {
  username: string
  password: string
}


@Injectable()
export class ContactService {
  public selectedContact: Subject<any> = new Subject()
  public listContacts: Subject<any> = new Subject()

  constructor(private http: Http) { }

  putContact(c: ContactDetail) {
    console.log("put")
    console.log(JSON.stringify(c))
    this.http.put("http://127.0.0.1:1337/contacts", JSON.stringify(c)).subscribe(d => { this.getContact(c.username) })
  }

  postContact(c: ContactDetail) {
    console.log("posting")
    console.log(JSON.stringify(c))
    this.http.post("http://127.0.0.1:1337/contacts", JSON.stringify(c)).subscribe(c => { this.getAllContacts() })
  }

  getContact(username) {
    var url = "http://127.0.0.1:1337/contacts/?username=" + username
    this.http.get(url).map(r => { return r.json() as ContactDetail }).subscribe(c => {
      this.selectedContact.next(c)
    })
  }

  deleteContact(username) {
    var url = "http://127.0.0.1:1337/contacts/?username=" + username
    this.http.delete(url).map(r => { }).subscribe(() => { this.getAllContacts() })
  }

  getAllContacts() {
    this.http.get("http://127.0.0.1:1337/contacts").map(r => { return r.json() as Contact[] }).subscribe(c => {
      this.listContacts.next(c)
    })
  }



}
