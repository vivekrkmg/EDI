import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalManager } from 'ngb-modal';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Employee } from '../employee.model';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ActivityService } from './activity.service';

// declare var $:any;
@Component({
  selector: 'app-activitylist',
  templateUrl: './activitylist.component.html',
  styleUrls: ['./activitylist.component.css'],
})

export class ActivitylistComponent implements OnInit {
  url :any;
  submitted= false;
  Employees = [];
  isSave = true ;
  msg:any="";
 public addForm: FormGroup;

  constructor(public router:Router,config: NgbModalConfig,private formBuilder: FormBuilder, private modalService: NgbModal, private activity:ActivityService) {
    config.backdrop = 'static';
    config.keyboard = false;
   }
  

  ngOnInit() {
    this.getemployee()
    
    }
    get f() { return this.addForm.controls; }
    onSubmit() {
      debugger
      this.submitted = true;
       this.createemployee()
       this.getemployee()
  // this.router.navigate(["signup"])
  }
    CraeteForm(obj){
      debugger
      // if(obj){
      //   // this.addForm = this.formBuilder.group({  
      //   //   id:[obj.id],
      //   //   date: ['', Validators.required],
      //   //   company: [obj.company, Validators.required],
      //   //   previousfile: [obj.previousfile, Validators.required],
      //   //   recentfile: [obj.recentfile, Validators.required]
      //   // });
      // }else{
      //   this.addForm = this.formBuilder.group({  
      //     id:[],
      //     date: ['', Validators.required],
      //     company: ['', Validators.required],
      //     previousfile: ['', Validators.required],
      //     recentfile: ['', Validators.required]
      //   });
      // }
     
    }

open(content) {
  debugger
   this.addForm = this.formBuilder.group({  
    id:[],
    date: [''],
    company: ['', Validators.required],
    previousfile: ['', Validators.required],
    recentfile: ['', Validators.required],
    status: ['']
  });
  this.modalService.open(content);
}
onSelectFile(event) {
  if (event.target.files && event.target.files[0]) {
    var reader = new FileReader();

    reader.readAsDataURL(event.target.files[0]); // read file as data url

    reader.onload = (event) => { // called once readAsDataURL is completed
 // this.url=event.target.result
    }
  }
}
onSelectchange(event) {
  if (event.target.files && event.target.files[0]) {
    var reader = new FileReader();

    reader.readAsDataURL(event.target.files[0]); // read file as data url

    reader.onload = (event) => { // called once readAsDataURL is completed
  //this.url=event.target.result
    }
  }
}
getemployee() {  
  this.activity.getUsers()  
  .subscribe((data: Employee[]) => {  
    debugger
    this.Employees = data;     
  });    
}

 updateemployee() {
   debugger
  const employee = this.addForm.getRawValue();
 this.isSave = true
   this.activity.updateUser(employee)
     .subscribe((data : Employee[])=> {
      this.Employees.filter((e)=>{
        if(e["id"]===data["id"]){
        e=data;
return data;
      
        }
      
      }) ;  
      this.getemployee()
      Swal.fire('record is successfully updated.....')
   
       this.CraeteForm(null); 
    })
    

 }

createemployee() {
  debugger;
  if(this.addForm.invalid)
  {
    Swal.fire('Select All Fields.....');
    return false;
  }
 let employee = this.addForm.value;
 let currentDate =  (new Date().getMonth().toString() ) + '/' + new Date().getDate().toString() + '/' + new Date().getFullYear().toString();
 this.addForm.controls.date.setValue(currentDate)
 employee.id = this.Employees.length + 1;

 this.activity.createUser(this.addForm.value)  
   .subscribe ( (data:Employee[]) =>{
   this.Employees.push(data) 
   this.addForm.reset()
  
   Swal.fire('Generate Report Successfully.....')
   })
  this.modalService.dismissAll()
}
deletemployee(id) {
  debugger
  this.activity.deleteUser(id)
    .subscribe(() => {
     this.getemployee();
   
    })
    Swal.fire('record is successfully deleted.....')
}
editemployee (employee:any){
debugger
  this.isSave = false;
this.CraeteForm(employee);

}
logout(){
  debugger
  this.router.navigate(['/login']);
}
}








// isSave = true;
// employees = [
//   {name:"Sikandar",email:"abc@gmail.com", position:"Programmer"},
//   {name:"Alex",email:"abcd@gmail.com", position:"Designer"},
//   {name:"Maria", email:"absc@gmail.com",position:"Manager"}
// ];
// model:any={};
// model2:any={};
// msg:any="";
// addEmployee(){
//   debugger;
//   console.log (this.addForm)

//   this.model.name = this.addForm.controls.name.value
//   this.model.email = this.addForm.controls.email.value
//   this.model.position = this.addForm.controls.position.value

//   this.employees.push(this.model);
//   this.model = {};
//   this.msg = "Record is successfully added..... "; 

// }
// deleteEmployee(i){
//   this.employees.splice(i,1);
//   this.msg = "Record is successfully deleted..... ";

// }
// myValue;
// editEmployee(k){
//  this. isSave = false;

//   var employee = this.employees[k];
//   this.InitializeEmp(employee);


// }
// updateEmployee(){
//   debugger
//   this.isSave = true

//   let k= this.myValue;
//   for(let i=0; i<this.employees.length;i++){
//     if(i==k){


//       this.employees[i]= this.model;
//       this.model = {};
//       this.msg = "Record is successfully updated..... ";
//     }

//   }






  // this.InitializeEmp(null);


//   private InitializeEmp(employee) {
//     if(employee){
//       this.addForm = this.formBuilder.group({
//         name: [employee.name, Validators.required],
//         email: [employee.email, Validators.required],
//         position: [employee.position, Validators.required],
//       });
//     }else{
//       this.addForm = this.formBuilder.group({
//         name: ['', Validators.required],
//         email: ['', Validators.required],
//         position: ['', Validators.required],
//       });
//     }

//   }

// get f() { return this.addForm.controls; }
//  onSubmit() {
// // //   this.isSave = true;


// console.warn(this.addForm.value);
//  }
//   clickMe(){
//     this.msg = "";
//   }




