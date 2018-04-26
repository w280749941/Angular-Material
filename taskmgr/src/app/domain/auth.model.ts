import { User } from '.';
import { Err } from './err';

export interface Auth {
  user?: User;
  userId?: string;
  err?: Err;
  token?: string;
}
