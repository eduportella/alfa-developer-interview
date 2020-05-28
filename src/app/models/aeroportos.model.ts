export class AeroportoOutputModel {
  context: string;
  value: [
    {
      Name: string;
      IcaoCode: string;
      IataCode: string;
      Location: {
        Address: string;
        Loc: {
          type: string;
          coordinates: string[];
          crs: {
            type: string;
            properties: string;
            name: string;
          }
        }
      }
      City: {
        Name: string;
        CountryRegion: string;
        Region: string;
      }
    }
  ];

  constructor() { }
}
