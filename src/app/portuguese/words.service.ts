import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import 'firebase/firestore';
import { Word } from "./word.model";
import { DocumentChangeAction } from "@angular/fire/firestore/angular-fire-firestore";
import { map } from "rxjs/operators";
import { Subject } from 'rxjs/internal/Subject';
import { Subscription } from 'rxjs';

@Injectable()
export class WordService {
  wordsChanged = new Subject<Word[]>();
  private availableWords: Word[] = [];
  private fbSubs: Subscription[]=[]

  constructor(private db: AngularFirestore) {}

  fetchAvailableWords() {
    this.fbSubs.push(this.db
      .collection("availableWords")
      .snapshotChanges()
      .pipe(
        map(docArray => {
          return docArray.map((doc: DocumentChangeAction<Word>) => {
            return {
              name: doc.payload.doc.data().name,
            };
          });
        })
      )
      .subscribe((words: Word[]) => {
        this.availableWords = words;
        this.wordsChanged.next([...this.availableWords])
      }))
  }

    cancelSubscriptions() {
    this.fbSubs.forEach(sub => sub.unsubscribe())
  }

    addWord(name: string, category: string, usage: string) {
      const newWord: Word = {name: name, category: category, usage: usage}
      this.addDataToDatabase(newWord)
    }

    addDataToDatabase(word:Word) { 
    this.db.collection('availableWords').add(word);
  }
}
