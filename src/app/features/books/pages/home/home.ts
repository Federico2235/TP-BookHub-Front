import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  books = [
    {
      id: 1,
      title: 'Le Petit Prince',
      author: 'Antoine de Saint-Exupéry',
      genre: 'Roman',
      available: true,
      description: "Un classique poétique sur l'enfance, l'amitié et le sens de la vie.",
      imageUrl: '/assets/images/book-placeholder.jpg'
    },
    {
      id: 2,
      title: '1984',
      author: 'George Orwell',
      genre: 'Science-fiction',
      available: false,
      description: 'Une dystopie sur la surveillance, le pouvoir et la liberté.',
      imageUrl: '/assets/images/book-placeholder.jpg'
    },
    {
      id: 3,
      title: "L'Étranger",
      author: 'Albert Camus',
      genre: 'Philosophie',
      available: true,
      description: "Un roman majeur autour de l'absurde et de la condition humaine.",
      imageUrl: '/assets/images/book-placeholder.jpg'
    }
  ];
}
