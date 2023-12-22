export interface LoginRequestBody {
  email: string;
  password: string;
}

export interface NewUserRequestBody {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface CreateUserRequestBody {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  country: string;
  age: number;
  gender: string;
  weightKg: number;
  heightCm: number;
  diabetesType: string;
  medicationList: string[];
  caloricGoalKcal?: number;
  hyperMgDl: number;
  hypoMgDl: number;
  targetLowerMgDl: number;
  targetUpperMgDl: number;
}
