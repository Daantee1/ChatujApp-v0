import { Component } from '@angular/core';
import { ChatboxComponent } from "../chatbox/chatbox.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [ChatboxComponent]
})
export class HomeComponent {

}
