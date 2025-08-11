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

type Employee = {
  readonly id: number;
  name?: string;
  retire: (date: Date) => void;
};

let employee: Employee = {
  id: 1,
  name: "Andrei",
  retire: (date: Date) => {
    console.log(date);
  },
};

//Union types
function kgToLbs(weight: number | string): number {
  //Narrowing
  if (typeof weight === "number") {
    return weight * 2.2;
  } else {
    return parseInt(weight) * 2;
  }
}

kgToLbs(10);
kgToLbs("10");

//Intersection types
type Draggable = {
  drag: () => void;
};
type Resizable = {
  resize: () => void;
};
type UIWidget = Draggable & Resizable;

let textBox: UIWidget = {
  drag: () => {},
  resize: () => {},
};

//Literal types
type Quantity = 50 | 100;
let quantity: Quantity = 50;

type Metric = "cm" | "inch";

//Nullable types
function greet(name: string | null | undefined) {
  if (name) console.log(name);
  else console.log("Hola!");
}
greet(undefined);
greet(null);
greet("Andrei");

//Optional chaining
type Customer = {
  birthday?: Date;
};
function getCustomer(id: number): Customer | null | undefined {
  return id === 0 ? null : { birthday: new Date() };
}
let customer = getCustomer(0);
console.log(customer?.birthday);
let customer2 = getCustomer(1);
console.log(customer2?.birthday?.getFullYear());

//optional array element
//customers?.[0]

//optional call operator
let log: any = null;
log?.("a");

//nullish operator
let speed: number | null = null;
let ride = {
  //Falsy = undefined, null, '', false, 0
  //nullishg coalescing operator (not null or undefined)
  speed: speed ?? 30,
};

//type assertions
//no type convertion happens here
let phone = document.getElementById("phone") as HTMLInputElement;
let phone2 = <HTMLInputElement>document.getElementById("phone");
//HTMLElement - parent class for javascript
let abc = phone.value;

//unknown type
function render(document: unknown) {
  //type narrowing
  if (typeof document === "string") {
    document.toUpperCase();
  }
  // if(document instanceof AnyObject)
  // {

  // }
}

//the never type
//we use this to tell the compiler that this function never returns

function processEvents() : never{
  while (true) {
    //read message from queue
  }
}

processEvents();
console.log("Hello World");
