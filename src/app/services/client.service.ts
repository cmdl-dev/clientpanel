import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from "@angular/fire/firestore";

import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Client } from "../models/Client";

@Injectable({
  providedIn: "root",
})
export class ClientService {
  clientsCollection: AngularFirestoreCollection<Client>;
  clientDoc: AngularFirestoreDocument<Client>;
  clients: Observable<Client[]>;
  client: Observable<Client>;

  constructor(private afs: AngularFirestore) {
    this.clientsCollection = this.afs.collection("clients", ref =>
      ref.orderBy("lastName", "asc")
    );
  }

  getClients(): Observable<Client[]> {
    //get the clients with the id
    this.clients = this.clientsCollection.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as Client;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
    return this.clients;
  }
  newClient(client: Client) {
    this.clientsCollection.add(client);
  }
  getClient(id: string): Observable<Client> {
    this.clientDoc = this.afs.doc<Client>(`clients/${id}`);
    this.client = this.clientDoc.snapshotChanges().pipe(
      map(a => {
        if (a.payload.exists === false) {
          return null;
        } else {
          const data = a.payload.data() as Client;
          const id = a.payload.id;
          return { id, ...data };
        }
      })
    );
    return this.client;
  }
  updateClient(client: Client) {
    this.clientDoc = this.afs.doc(`clients/${client.id}`);
    if (client.id) {
      delete client.id;
    }
    this.clientDoc.update(client);
  }
  deleteClient(client: Client) {
    this.clientDoc = this.afs.doc(`clients/${client.id}`);
    this.clientDoc.delete();
  }
}
