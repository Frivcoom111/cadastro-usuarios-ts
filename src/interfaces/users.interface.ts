export interface IUsers {
  id: string; 
  name: string;
  email: string;
  password: string;
  age: number;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserResponse {
  id: string;
  name: string;
  email: string;
  age: number;
  phone: string;
}