import { Component } from '@angular/core';
import { interval } from 'rxjs';
import { QuestionaireService } from '../services/questionaire.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
})
export class QuestionsComponent {
  name: string = '';
  questionaireList: any = [];
  currentQuestion: number = 0;
  points: number = 0;
  counter: number = 180;
  attempted: number = 0;
  unattempted: number = 0;
  correctAnswers: number = 0;
  inCorrectAnswers: number = 0;
  interval$: any;
  isQuizCompleted: boolean = false;
  progress: string = '0';

  constructor(private question: QuestionaireService) {}

  ngOnInit(): void {
    this.name = sessionStorage.getItem('name')!;
    this.getAllQuestions();
    this.startCounter();
  }

  getAllQuestions() {
    this.question.getQuestions().subscribe({
      next: (res: any) => {
        console.log(res.questions);
        this.questionaireList = res.questions;
      },
    });
  }

  nextQuestion() {
    this.currentQuestion++;
    this.resetCounter();
    this.getProgressPercent();
  }

  previousQuestion() {
    this.currentQuestion--;
    this.resetCounter();
    this.getProgressPercent();
  }

  answer(currentQ: number, option: any) {
    this.attempted++;
    if (option.correct) {
      this.points += 10;
      this.correctAnswers++;
      setTimeout(() => {
        this.currentQuestion++;
        this.resetCounter();
        this.getProgressPercent();
      }, 500);
    } else {
      this.points -= 5;
      this.inCorrectAnswers++;
      setTimeout(() => {
        this.currentQuestion++;
        this.resetCounter();
        this.getProgressPercent();
      }, 500);
    }
    if (currentQ == this.questionaireList.length) {
      this.isQuizCompleted = true;
      this.stopCounter();
    }
  }

  startCounter() {
    this.interval$ = interval(1000).subscribe((val) => {
      this.counter--;
      if (this.counter == 0) {
        this.currentQuestion++;
        this.unattempted++;
        // this.points -= 5;
        this.counter = 180;
      }
      if (this.currentQuestion == this.questionaireList.length) {
        this.isQuizCompleted = true;
        this.stopCounter();
      }
    });
    setTimeout(() => {
      this.interval$.unsubscribe();
    }, 1800000);
  }

  stopCounter() {
    this.interval$.unsubscribe();
    this.counter = 0;
  }

  resetCounter() {
    this.stopCounter();
    this.counter = 180;
    this.startCounter();
  }

  restartQuiz() {
    this.resetCounter();
    this.currentQuestion = 0;
    this.points = 0;
    this.correctAnswers = 0;
    this.inCorrectAnswers = 0;
    this.counter = 180;
    this.progress = '0';
  }

  getProgressPercent() {
    this.progress = (
      (this.currentQuestion / this.questionaireList.length) *
      100
    ).toString();
  }
}
