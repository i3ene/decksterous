import { Component } from '@angular/core';

@Component({
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutPage {
  technologies: { title: string; img: string, imgSize: number, text: string }[] = [
    { title: "Node.js", img: "https://www.svgrepo.com/show/354118/nodejs.svg", imgSize: 64, text: "text" },
    { title: "Angular", img: "https://www.svgrepo.com/show/373427/angular.svg", imgSize: 32, text: "text" },
    { title: "Express.js", img: "https://www.svgrepo.com/show/353724/express.svg", imgSize: 64, text: "text" },
    { title: "Sequelize", img: "https://www.svgrepo.com/show/354333/sequelize.svg", imgSize: 32, text: "text" },
    { title: "Maria DB", img: "https://www.svgrepo.com/show/354039/mariadb.svg", imgSize: 64, text: "text" },
    { title: "Socket.IO", img: "https://www.svgrepo.com/show/306753/socket-dot-io.svg", imgSize: 32, text: "text" },
    { title: "JWT", img: "http://jwt.io/img/logo-asset.svg", imgSize: 32, text: "text" }
  ]

}
