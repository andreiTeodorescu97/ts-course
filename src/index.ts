//Getting started
let age: number = 20;
if (age < 50) age += 10;

//Fundamentals
let sales: number = 123_456_789;
let sales2 = 123_456_789;
let course: string = "TypeScript";
let isPublished: boolean = true;
let level; //any - should be avoided as much as possible in TypeScript
level = 1;
level = "a";

let numbers: number[] = [1, 2, 3];
let numbers2: number[] = [1, 2, 3];
let numbers3 = []; //any array - avoid

let user: [number, string] = [1, "Andrei"]; //tuple
user.push(1); //problem with typescript because tuple it is translated to a js array

const enum Size {
  Small = 1,
  Medium,
  Large,
}
let mySize: Size = Size.Medium;
console.log(mySize);

function calculateTax(income: number, taxYear: number = 2022): number {
  if (taxYear < 2022) {
    return income * 1.2;
  }
  return income;
}
let x = calculateTax(1);

let employee: {
  readonly id: number;
  name?: string;
  retire: (date: Date) => void;
} = {
  id: 1,
  name: "Andrei",
  retire: (date: Date) => {
    console.log(date);
  },
};
