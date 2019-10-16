import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import xml2js from 'xml2js';
import Swal from 'sweetalert2';
import { HttpHeaders, HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public xmlItems: any;
  public LoginForm: FormGroup;
submitted = false
  constructor(private _fb:FormBuilder , private router:Router , private http: HttpClient) 
  { 
     this.loadXML();
    }


  email: string;
  password: string;
  ngOnInit() {
    this.LoginForm= this._fb.group({

      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

  }
  get f() { return this.LoginForm.controls; }
  onSubmit() {
    debugger
    this.submitted= true;
    if (this.LoginForm.invalid){
    return;
    }
    var dd = this.xmlItems.filter(x => x.email== this.LoginForm.controls.email.value &&
      x.password ==this.LoginForm.controls.password.value);
      
     if (dd.length>0)
     {
     
     this.router.navigate(["activitylist"])
     }
      else  {
      Swal.fire('invalid user')
    }
    
  }
  loadXML() {
    debugger
    this.http.get('/assets/file.xml',
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'text/xml')
          .append('Access-Control-Allow-Methods', 'GET')
          .append('Access-Control-Allow-Origin', '*')
          .append('Access-Control-Allow-Headers', "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Access-Control-Request-Method"),
        responseType: 'text'
      })
      .subscribe((data) => {
        this.parseXML(data)
          .then((data) => {
            this.xmlItems = data;
          });
      });
  }
  parseXML(data) {
    return new Promise(resolve => {
      var k: string | number,
        arr = [],
        parser = new xml2js.Parser(
          {
            trim: true,
            explicitArray: true
          });
      parser.parseString(data, function (err, result) {
        var obj = result.Users;
        for (k in obj.login) {
          var item = obj.login[k];
          arr.push({
            id: item.id[0],
            email: item.email[0],
            password: item.password[0],
           
          });
        }
        resolve(arr);
      });
    });
  }
}


  // authanticateuser() {
  //   debugger
  //   let User = null;
  //   // let navigate= false;
  //   if (this.LoginForm.invalid) {
  //     return;
  //   }
  //   this.userservice.getUsers().subscribe(Data => {
  //     debugger
  //     if(Data)
  //     {
  //       this.UserDetail= Data as User[];
        
  //      let varr= this.UserDetail.filter(x=>x.email== this.loginForm.controls.email.value &&
  //        x.password ==this.loginForm.controls.password.value
       
       
       
  //       //   {
  //       //   debugger
  //       //   if(x.email== this.loginForm.controls.email.value && x.password ==this.loginForm.controls.password.value)
  //       //   {
  //       //     navigate= true;
           
  //       //   }
  //       // } 
          
  //       );
  //       console.log(varr);
  //       if(varr.length > 0)
  //       {
  //        this.router.navigate(["employee"])
  //       }
  //       else{
  //         Swal.fire('invalid user')
  //       }
          
        
  //     }

  //     // User = Data.map(filter(user => user['email'] == this.loginForm.controls.email.value &&
  //     //   user['password'] == this.loginForm.controls.password.value))
  //     // if (User['length'] > 0) {
  //     //   this.router.navigate(["employee"])
  //     // } else {
  //     //   alert("invalid user")
  //     // }
  //   });
  // }
 



