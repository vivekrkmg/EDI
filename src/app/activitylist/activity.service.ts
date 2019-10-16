import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {


  options = {
    headers: new HttpHeaders(
      {
        'Content-Type': 'application/json'
      }
    )
  }

  constructor(private http: HttpClient) { }
  Url = '  http://localhost:3000/employes';

 

  getUsers() {
    return this.http.get(this.Url);
  }

  getUserByid(id : number) {
    return this.http.get(this.Url + '/' + id);
  }

  createUser(emp) {
    return this.http.post(this.Url, emp, this.options);
  }

  register(user: User) {
    return this.http.post('http://localhost:3000/users', user, this.options);
}

  updateUser(emp) {
    return this.http.put(this.Url + '/'+emp.id , emp);
  }

  deleteUser(id: number) {
    return this.http.delete(this.Url + '/' + id);
  }
}

