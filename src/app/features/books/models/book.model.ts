import { Category } from './category.model';
import { AvailabilityStatus } from './availabilityStatus.model';

export interface Book {
  id: number;
  title: string;
  author: string;
  category: Category;
  status: AvailabilityStatus;
  shortDesc?: string;
  longDesc?: string;
  imgUrl: string;
}
