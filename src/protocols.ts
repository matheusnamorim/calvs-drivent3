export type ApplicationError = {
  name: string;
  message: string;
};

export type ViaCEPAddress = {
  logradouro: string,
  complemento: string,
  bairro: string,
  localidade: string,
  uf: string,

};

//Regra de Negócio
export type AddressEnrollment = {
  logradouro: string,
  complemento: string,
  bairro: string,
  cidade: string,
  uf: string,
  error?: string

}

export type RequestError = {
  status: number,
  data: object | null,
  statusText: string,
  name: string,
  message: string,
}

export type Booking = {
  createdAt: Date,
  id: number,
  roomId: number,
  updatedAt: Date,
  userId: number,
}

export type Room = {
  capacity: number,
  createdAt: Date,
  hotelId: number,
  id: number,
  name: string,
  updatedAt: Date,
}
