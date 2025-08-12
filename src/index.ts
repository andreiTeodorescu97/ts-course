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
// let phone = document.getElementById("phone") as HTMLInputElement;
// let phone2 = <HTMLInputElement>document.getElementById("phone");
//HTMLElement - parent class for javascript
// let abc = phone.value;

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

function processEvents(): never {
  while (true) {
    //read message from queue
  }
}

// processEvents();
// console.log("Hello World");

//objected oriented programming
//readonly = set only in constructor
class Account {
  // readonly id: number;
  // owner: string;
  // private _balance: number;
  nickname?: string; //optional property

  constructor(
    public readonly id: number,
    public owner: string,
    private _balance: number
  ) {
    // this.id = id;
    // this.owner = owner;
    // this._balance = balance;
  }

  deposit(amount: number): void {
    if (amount <= 0) {
      throw new Error("Invalid amount");
    }
    this._balance += amount;
  }

  private calculateTax() {}

  get balance(): number {
    return this._balance;
  }

  // set balace(value: number) {
  //   if (value < 0) {
  //     throw new Error("Ivalid value");
  //   }
  //   this._balance = value;
  // }
}

let account = new Account(1, "Andrei", 0);
account.deposit(10);
console.log(typeof account);
console.log(account instanceof Account);
console.log(account.balance);

//index signatures
class SeatAssigment {
  //index signature property - to dynamically add properties to an object
  [seatNumber: string]: string;
}
let seats = new SeatAssigment();
seats.A1 = "Andrei";
seats.A2 = "Toma";
seats["A3"] = "Mark";

//static props
class Ride {
  private static _activeRides: number = 0;
  start() {
    Ride._activeRides++;
  }
  stop() {
    Ride._activeRides--;
  }
  static get activeRides() {
    return Ride._activeRides;
  }
}
let ride1 = new Ride();
let ride2 = new Ride();
ride1.start();
ride2.start();
console.log("activeRides:");
console.log(Ride.activeRides);
console.log(Ride.activeRides);

//inheritance
class Person {
  constructor(public fistName: string, public lastName: string) {}

  get fullName() {
    return this.fistName + " " + this.lastName;
  }

  //protected - should be avoided because it creates a lot of coupling in an application
  protected walk() {
    console.log("walk");
  }
}

class Student extends Person {
  constructor(public studentId: number, fistName: string, lastName: string) {
    super(fistName, lastName);
  }

  takeTest() {
    console.log("Taking a test");
  }
}

//method overrinding
class Teacher extends Person {
  override get fullName() {
    return "Teacher " + super.fullName;
  }
}

let student = new Student(1, "Andrei", "Teodorescu");
let teacher = new Teacher("Andrei", "aaaa");
console.log(teacher.fullName);

//polymorphism
printNames([new Student(1, "John", "Smith"), new Teacher("John", "Coke")]);

function printNames(people: Person[]) {
  for (let person of people) console.log(person.fullName);
}

//abstract class
abstract class Shape {
  constructor(public color: string) {}
  abstract render(): void;
}

class Circle extends Shape {
  constructor(public radius: number, color: string) {
    super(color);
  }

  override render(): void {
    console.log("rendering a circle");
  }
}

//interfaces
interface Calendar {
  name: string;
  addEvent(): void;
  removeEvent(): void;
}

class GoogleCalender implements Calendar {
  constructor(public name: string) {}
  addEvent(): void {
    throw new Error("Method not implemented.");
  }
  removeEvent(): void {
    throw new Error("Method not implemented.");
  }
}

//generics
class KeyValuePair<TKey, TValue> {
  constructor(public key: TKey, public value: TValue) {}
}

let pair1 = new KeyValuePair<string, string>("1", "Andrei");
let pair2 = new KeyValuePair<number, number>(1, 2);

//generic methods
class ArrayUtils {
  static wrapInArray<T>(value: T) {
    return [value];
  }
}
let numbers12 = ArrayUtils.wrapInArray(1);

//generic interfaces
interface Result<T> {
  data: T | null;
  error: string | null;
}

function fetch<T>(url: string): Result<T> {
  return { data: null, error: url };
}

interface User {
  username: string;
}

interface Product {
  title: string;
}

let r1 = fetch<User>("");
r1.data?.username;
let r2 = fetch<Product>("");
r2.data?.title;

//constraints
function echo<T extends number | string | { name: string } | User>(
  value: T
): T {
  return value;
}
// echo(true);

//extending generic classes
interface ProductS {
  name: string;
  price: number;
}

class Store<T> {
  protected _objects: T[] = [];
  add(obj: T): void {
    this._objects.push(obj);
  }
  //T is ProductS
  //keyof T => 'name' | 'price'
  find(property: keyof T, value: unknown): T | undefined {
    return this._objects.find((obj) => obj[property] === value);
  }
}

//pass on the generic type parameter
class CompressibleStore<T> extends Store<T> {
  compress() {}
}

//an object that contains a prop name, restrictive
class SearchableStore<T extends { name: string }> extends Store<T> {
  // override find(name: string): T | undefined {
  //   return this._objects.find((o) => o.name === name);
  // }
}

//fix the generic type parameter
class ProductStore extends Store<ProductS> {
  filterByCategory(category: string): ProductS[] {
    return [];
  }
}

let store1 = new Store<ProductS>();
let store2 = new CompressibleStore<ProductS>();
store1.add({ name: "a", price: 1 });
store1.add({ name: "b", price: 2 });
store1.add({ name: "c", price: 3 });
store1.find("name", "a");
// store1.find("nonExistingProperty", "a");

//Type mapping
type ReadOnlyObject<T> = {
  //index signature
  //keyof
  readonly [Property in keyof T]: T[Property];
};

type OptionalObject<T> = {
  [Property in keyof T]?: T[Property];
};

type NullableObject<T> = {
  [Property in keyof T]: T[Property] | null;
};

//decorators
function Component(constructor: Function) {
  console.log("Component decorator called");
  constructor.prototype.uniqueId = Date.now();
  constructor.prototype.insertInDom = () => {
    console.log("Inserting the component in the DOM");
  };
}
//decorator factory
type ComponentOptions = {
  selector: string;
};
function Component1(options: ComponentOptions) {
  return (constructor: Function) => {
    console.log("Component decorator called");
    constructor.prototype.uniqueId = Date.now();
    constructor.prototype.insertInDom = () => {
      console.log("Inserting the component in the DOM");
    };
  };
}

function Pipe(constructor: Function) {
  console.log("Pipe decorator called");
  constructor.prototype.pipe = true;
}

@Component1({ selector: "#my-profile" })
@Pipe
class ProfileComponent {}

//method decorator
function Log(target: any, methodName: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value as Function;
  descriptor.value = function (...args: any) {
    console.log("Before");
    original.call(this, ...args);
    console.log("After");
  };
}

class Car {
  @Log
  say(message: string) {
    console.log("Car says " + message);
  }
}
let car = new Car();
car.say("hello");

//accesor decorator
function Capitalize(
  target: any,
  methodName: string,
  descriptor: PropertyDescriptor
) {
  const original = descriptor.get;
  descriptor.get = function () {
    const result = original?.call(this);
    if (typeof result === "string") {
      return result.toUpperCase();
    } else {
      return result;
    }
  };
}

class Cat {
  constructor(public firstName: string, public lastName: string) {}

  @Capitalize
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  @Capitalize
  get number() {
    return 0;
  }

  @Capitalize
  get null() {
    return null;
  }
}

let cat1 = new Cat("a", "b");
console.log(cat1.fullName);
console.log(cat1.number);
console.log(cat1.null);

//property decorator
function MinLength(length: number) {
  return (target: any, properyName: string) => {
    let value: string;

    const descriptor: PropertyDescriptor = {
      get() {
        return value;
      },
      set(newValue: string) {
        if (newValue.length < length)
          throw new Error(
            `${properyName} should be at least ${length} characters long`
          );
        value = newValue;
      },
    };
    Object.defineProperty(target, properyName, descriptor);
  };
}
class Dog {
  @MinLength(4)
  password: string;
  constructor(password: string) {
    this.password = password;
  }
}
let dog1 = new Dog("a");
console.log(dog1.password);
