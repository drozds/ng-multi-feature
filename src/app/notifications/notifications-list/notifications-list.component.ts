import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Message, NotificationsService } from '../notifications.service';

@Component({
  selector: 'app-notifications-list',
  templateUrl: './notifications-list.component.html',
  styleUrls: ['./notifications-list.component.scss']
})
export class NotificationsListComponent implements OnInit {
  messages$: Observable<Message[]>;

  constructor(
    private notificationsService: NotificationsService
  ) { 
    this.messages$ = this.notificationsService.messagesOutput;
  }

  ngOnInit(): void {
    setTimeout(() => { this.notificationsService.addSuccess("Success"); },1000)
  }

  clearMessage(id: number) {
    this.notificationsService.clearMessage(id);
  }
}
