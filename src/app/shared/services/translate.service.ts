import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TranslateService {

  constructor(private http: HttpClient) { }

  translate(source: string = "", destination: string = "", text: string): Observable<any> {
    let options = {
      headers: new HttpHeaders({
        "content-type": "application/x-www-form-urlencoded",
        "accept-encoding": "application/gzip",
        "x-rapidapi-key": process.env["NG_APP_GOOGLE_TRANSLATE_API_KEY"] || '',
        "x-rapidapi-host": process.env["NG_APP_GOOGLE_TRANSLATE_API_HOST"] || ''
      })
    };
    let body = new URLSearchParams({
      "source": source,
      "target": destination,
      "q": text,
    });
    return this.http.post(`https://${process.env["NG_APP_GOOGLE_TRANSLATE_API_HOST"] || ''}/language/translate/v2`, body.toString(), options);
  }
}
