import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core/";

@Injectable({providedIn:"root"})
export class BankService {
    constructor(private http:HttpClient) {}

    getBankServiceDetails() {
        return this.http.get<any[]>("http://localhost:10000/bank-details-api/");
    }

    saveBankServiceDetails(bank: any) {
        return this.http.post("http://localhost:10000/bank-details-api/save", bank);
    }

    uploadCsv(formData: FormData) {
        return this.http.post("http://localhost:10000/bank-details-api/upload", formData);
    }
}