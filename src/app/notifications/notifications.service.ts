import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { scan } from 'rxjs/operators';

export interface Message {
  type: 'success' | 'error' | 'clear';
  id: number;
  text?: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  messagesInput: Subject<Message>;
  messagesOutput: Observable<Message[]>;

  constructor() { 
    this.messagesInput = new Subject<Message>();
    this.messagesOutput = this.messagesInput.pipe(
      scan((acc: Message[] , value: Message) => {
        if (value.type === 'clear') {
          return acc.filter( message => message.id !== value.id)
        } else {
          return [...acc, value]
        }
      }, [])
    )
  }

  addSuccess(message: string) {
    const id = this.randomId();

    this.messagesInput.next({
      type: 'success',
      id,
      text: message
    })

    setTimeout(() => {
      this.clearMessage(id)
    }, 5000);
  }

  addError(message: string) {
    const id = this.randomId();

    this.messagesInput.next({
      type: 'error',
      id,
      text: message
    })

    setTimeout(() => {
      this.clearMessage(id)
    }, 5000);
  }

  clearMessage(id: number) {
    this.messagesInput.next({
      id,
      type: 'clear'
    })
  }

  
  randomId() {
    return Math.round(Math.random() * 10000);
  }
}
