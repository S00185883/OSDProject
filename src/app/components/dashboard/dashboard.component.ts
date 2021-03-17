import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/app';
import { NgAuthService } from "../../services/ng-auth.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  constructor(public ngAuthService: NgAuthService) { }

  ngOnInit(): void {
  }

  addAdmin(email) {
    let addRole=firebase.functions().httpsCallable('addAdminRole');
    console.log(email.value)
    addRole({email:email.value})
    .then((result) => {
      // Read result of the Cloud Function.
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
   return false;
  }

  removeAdmin(email) {
    let removeRole=firebase.functions().httpsCallable('removeAdminRole');
    removeRole({email:email.value})
    .then((result) => {
      // Read result of the Cloud Function.
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
   return false;
  }
  

}