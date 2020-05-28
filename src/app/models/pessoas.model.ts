export class PessoasInputModel {

  UserName: string;
  FirstName: string;
  LastName: string;
  Emails: string[];
  AddressInfo: AddressData[]

  constructor() { }
}


export class PessoasOutputModel {

  context: string;
  value: [
    {
      id: string;
      etag: string;
      editLink: string;
      UserName: string;
      FirstName: string;
      LastName: string;
      Emails: string[];
      AddressInfo: AddressData,
      Gender: string;
      Concurrency: string;
    }
  ];

  constructor() { }
}

export class AddressData {
  Address: string = "";
  City: cityData
}

export class cityData{
    CountryRegion: string;
    Name: string;
    Region: string;
}
