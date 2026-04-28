import { Category } from './category.model';
import { AvailabilityStatus } from './availabilityStatus.model';
import { BookCondition } from './bookCondition.model';

export interface Book {
  id: number;
  title: string;
  author: string;
  category: Category;
  status: AvailabilityStatus;
  condition: BookCondition;
  shortDesc?: string;
  longDesc?: string;
  imgUrl: string;
  reserved:boolean;
}
