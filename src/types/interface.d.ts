declare interface IUser {
  id: string
  name: string
  email: string
  avatar?: string
  age: number
  phone: string
}

declare interface IImageResult {
  title: string
  percent: number
}

interface IImages {
  id: string
  title: string
  url: string
}

declare interface IPatient extends IUser {
  id_patient: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  address: string;
  create_at: Date;
  image_eyes: {
    data: Buffer;
    contentType: string;
  };
  haveResult: boolean;
  is_result: boolean
  result: IImageResult[];
  doctor: string;
  date: string;
  gender: string;
  images: IImages[];
  doctorComment?: string;
}

declare interface IResFormat<T> {
  totalPages: number
  currentPage: number
  data: T[]
}

declare interface IResultOptions {
  value: number
  name: string
}
