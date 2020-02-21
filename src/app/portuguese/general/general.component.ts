import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { WordService } from '../words.service';
import { Word } from '../word.model';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';
import { Observable, Subscription } from 'rxjs';




@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit, OnDestroy {
  words: Word[];
  wordSubscription: Subscription;

  constructor(
    private wordService: WordService, 
    private db: AngularFirestore) { }

  ngOnInit() {
    this.wordSubscription = this.wordService.wordsChanged.subscribe(words => this.words = words);
    this.wordService.fetchAvailableWords();
    }

  onSubmit (form:NgForm) {  
    this.wordService.addWord(form.value.name, form.value.category, form.value.usage)
  }

  ngOnDestroy() {
    this.wordSubscription.unsubscribe()
  }

}
