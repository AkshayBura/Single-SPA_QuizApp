import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuestionaireService {

  constructor(private _http: HttpClient) { }

  getQuestions() {
    return this._http.get<any>("http://localhost:4202/assets/questions.json");
  }
}
