export interface IBorrowRequest {
  user: string;
  requestedBook: string;
  isDelivered: boolean;
  deliveredAt: Date;
  isReturned: boolean;
  returnedAt: Date;
}
