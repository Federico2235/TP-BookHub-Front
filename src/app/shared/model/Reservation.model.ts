import { User } from '../../features/users/models/user.model';
import { Book } from '../../features/books/models/book.model';

export interface Reservation {
  id: number
  user: User
  book: Book
  date: Date
}
