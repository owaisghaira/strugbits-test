export interface ICustomer {
  id?: number;
  email: string;
  first_name?: string;
  last_name?: string;
  name?:string;
  avatar: any;
  [key: string]: any;
}