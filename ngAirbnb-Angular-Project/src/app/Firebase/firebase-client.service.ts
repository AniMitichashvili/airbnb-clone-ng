import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseClientService {

  constructor(private firebaseDb: AngularFireDatabase) { }

  create(path: string, data: any) {
    try {
      this.firebaseDb.list(path).push(data);
      return true;
    } catch (ex) {
      return false;
    }
  }

  read(path: string): Observable<any> {
    return this.firebaseDb.list(path).valueChanges();
  }

  update(path: string, key: string, data: any): Promise<void> {
    return this.firebaseDb.list(path).update(key, data);
  }

  delete(path: string, key: string): Promise<void> {
    return this.firebaseDb.list(path).remove(key);
  }
}
