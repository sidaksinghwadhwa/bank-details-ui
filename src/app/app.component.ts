import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {BankService} from './bank.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {

  
  bankForm: FormGroup ;
  bankDetails:any[] = [];
  constructor(private bankService:BankService) { 
    this.bankForm = new FormGroup({
      bankName: new FormControl(),
      cardNumber: new FormControl(),
      expiryDate: new FormControl(),
    });
    this.bankService.getBankServiceDetails().subscribe(
      (data)=> {
        this.bankDetails = data;
      }
    )
  }

  ngOnInit() {

    
  }

  uploadFile(event) {
    var formData = new FormData();
    formData.append("file", event[0], event[0].name);
    this.bankService.uploadCsv(formData).subscribe(
      (data)=>{
        this.bankService.getBankServiceDetails().subscribe(
          (data)=> {
            this.bankDetails = data;
          }
        )
      }
    );
  }

  submit() {
    var bank = {
      bankName: this.bankForm.controls.bankName.value,
      cardNumber: this.bankForm.controls.cardNumber.value,
      expiryDate: this.bankForm.controls.expiryDate.value,
    }

    this.bankService.saveBankServiceDetails(bank).subscribe(
      (data)=>{
        this.bankService.getBankServiceDetails().subscribe(
          (data)=> {
            this.bankDetails = data;
          }
        )
      }
    )
  }

}