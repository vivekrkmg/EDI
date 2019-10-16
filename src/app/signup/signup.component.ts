import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup;
 // Users = [];
  submitted = false;
  constructor(public router:Router, private formBiulder : FormBuilder) { }

  ngOnInit() {
    
    this.registerForm = this.formBiulder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
  });
  }
  get f() { return this.registerForm.controls; }
  onSubmit() {
    this.submitted = true;

   
    if (this.registerForm.invalid) {
        return;
    }
//this.registeremployee()
//this.getemploye()
 this.router.navigate(["signup"])
}
//registeremployee() {
  //debugger;
 //let user = this.registerForm.value;
 //user.id = this.Users.length + 1;

// this.userservice.register(this.registerForm.value)  
 //  .subscribe ( (data:User[]) =>{
  //  this.Users.push(data) 
 // this.getemploye()
   // this.registerForm.reset()
  
 //  Swal.fire('successfully Registered.....')
 //  })
 
//}
//getemploye() {

  //this.userservice.getUsers()    
  //.subscribe((data: User[]) => {  
    //this.Users = data;
     
  //});    
//}
}
