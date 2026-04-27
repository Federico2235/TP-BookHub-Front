import { Role } from '../../books/models/role.model';

export interface User {
  id?:number
  firstName: string
  lastName: string
  email: string
  role: Role
}
