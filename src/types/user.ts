export type User = {
  email: string;
  userName: string;
  enFirstName: string;
  enLastName: string;
  gender: string;
  birth: string;
  phoneNumber: string;
  headCount: number;
  childName: string;
};

export type UserInfoCategoyry = {
  id: string;
  name: string | string[];
  description?: string | string[];
}[];

export type UserChildName = {
  childName: string;
};
