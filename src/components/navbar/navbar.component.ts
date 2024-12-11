import {Component, EventEmitter, inject, Output} from '@angular/core';
import {RouterLink} from "@angular/router";
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
    imports: [
        RouterLink
    ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @Output() moreClicked: EventEmitter<string> = new EventEmitter<string>()

  protected auth = inject(AuthService)

}
