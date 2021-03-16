import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {BankService} from '../bank.service';

@Component({
  selector: 'app-bank-details',
  templateUrl: './bank-details.component.html',
  styleUrls: ['./bank-details.component.css']
})
export class BankDetailsComponent implements OnInit {

  bankForm: FormGroup ;
  bankDetails:any[] = [];
  constructor(private bankService:BankService) { 
    this.bankForm = new FormGroup({
      name: new FormControl(),
      number: new FormControl(),
      date: new FormControl(),
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
      id: this.bankForm.controls.number.value,
      name: this.bankForm.controls.name.value,
      number: this.bankForm.controls.number.value,
      date: this.bankForm.controls.date.value,
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
