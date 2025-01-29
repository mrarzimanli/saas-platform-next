import { ModalColor } from "../ui/Modal/Modal";

export interface IAlertData {
  type: ModalColor;
  title: string;
  description: string | React.ReactNode;
  icon: React.ReactNode;
}

// User Data Types
export interface User {
  id: string;
  email: string;
  username: string;
  password: string;
  plan: string;
  photoImg?: string;
  subscription?: Subscription;
}

// Subscription Types
export interface Subscription {
  userId: string;
  planId: string;
  status: string;
}

// Plan Types
export interface Plan {
  id: string;
  name: string;
  price: number;
  features: string[];
}
