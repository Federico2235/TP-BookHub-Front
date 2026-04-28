export interface BorrowCreate {
  userId: number
  bookId: number
  borrowStart: Date
  borrowEnd: Date
  returnDate?: Date
}
