import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {map, Observable} from 'rxjs';
import {ArticleService} from '../../services/article.service';
import {Article} from './article';
import {StepperComponent} from '../../components/stepper/stepper.component';
import {StepComponent} from '../../components/stepper/step/step.component';
import {ArticleComponent} from './article/article.component';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    StepperComponent,
    StepComponent,
    ArticleComponent,
    AsyncPipe,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  data: Observable<Article[]>  ;

  constructor(private route: ActivatedRoute, protected service: ArticleService) {
  this.data =  this.route.data.pipe(
      map(({ articles }) => articles)
    )

  }

  ngOnInit() {

  }
}
