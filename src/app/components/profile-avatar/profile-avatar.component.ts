import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-profile-avatar',
  templateUrl: './profile-avatar.component.html',
  styleUrls: ['./profile-avatar.component.scss']
})
export class ProfileAvatarComponent {
  @Input() appearance: "normal" | "circle" = "circle";
  @Input() border: boolean = true;
  @Input() size: number = 32;
  @Input() src?: string;
  defaultSrc: string = "/assets/person.png";
}
