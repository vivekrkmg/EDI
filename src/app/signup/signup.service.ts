import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class SignupService {
  registerForm: FormGroup;
  constructor() { }
}
