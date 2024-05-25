export class Student {
    id?:string
    firstName!: string;
    lastName!: string;
    dateOfBirth!: Date;
    email!: string;
    address!: {
      street: string;
      state: string;
      city: string;
      pincode: string;
    };
    subject!: string;
  }
  
