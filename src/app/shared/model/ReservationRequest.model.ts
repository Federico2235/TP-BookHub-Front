import { User } from '../../features/users/models/user.model';
import { Book } from '../../features/books/models/book.model';

export interface ReservationRequest {
  userId: number
  bookId: number
}
