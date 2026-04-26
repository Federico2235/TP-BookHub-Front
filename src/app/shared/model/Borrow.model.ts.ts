import { User } from '../../features/users/models/user.model';
import { Book } from '../../features/books/models/book.model';

export interface Borrow {
  borrowId: number;
  user: User;
  book: Book;
  borrowStart: Date;
  borrowEnd: Date;
  returnDate: Date;
}
