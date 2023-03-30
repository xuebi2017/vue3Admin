// 以下是描述普通对象的3种方法

// 1. 具体定义
// type Person = {
//   name: string;
//   age: number;
// };
// const yuping: Person = {
//   name: "yuping",
//   age: 18,
// };

//2. 索引签名
// type A = {
//   [k: string]: number;
// };
// const AA: A = {
//   age: 18,
// };

//3. Record泛型   type B全等于typeA, 就是同一种含义的两种写法
// type B = Record<string, number>;

//描述函数对象
// type Person = { name: string; age: number };
// type FnWidthThis = (this: Person) => void; //type定义的必须是箭头函数
// const sayHi: FnWidthThis = function () {
//   console.log("hi, " + this.name);
// }; //这里实际的函数必须不能是箭头函数
// const p: Person = { name: "zyp", age: 18 };
// sayHi.call(p);

// type Person = { name: string; age: number; sayHi: FnWidthThis };
// type FnWidthThis = (this: Person) => void; //type定义的必须是箭头函数
// const sayHi: FnWidthThis = function () {
//   console.log("hi, " + this.name);
// }; //这里实际的函数必须不能是箭头函数
// const p: Person = { name: "zyp", age: 18, sayHi };
// p.sayHi();

// const button = document.getElementById("***");

// const b: bigint = 100n;

//enum一般用来做number到string的映射，或者是做权限这块时会用到（位运算）
// enum E {
//   todo,
//   done,
//   archived,
//   deleted,
// }

// let status: E = E.todo;

// enum Permission {
//   None = 0,
//   Read = 1 << 0,
//   Write = 1 << 1,
//   Delete = 1 << 2,
//   Manage = Read | Write | Delete,
// }

// type User = {
//   permission: Permission;
// };
// const user: User = {
//   permission: 0b0101,
// };

// if ((user.permission & Permission.Write) === Permission.Write) {
//   console.log("拥有写权限！");
// }

//type和interface
// type Person = {
//   name: string;
//   age: number;
// };

// let p: Person = {
//   name: "zyp",
//   age: 18,
// };

// type A2 = Array<string>;

// interface A2 extends Array<string> {}

// interface Person {
//   name: string;
//   age: number;
// }

// type AAA = {
//   name: string;
// };
// type BBB = { age: number } & AAA;
// let bbb: BBB = {
//   name: "zyp",
//   age: 18,
// };

// let a: any = 1;
// a.split(",");

// type a = {
//   name1: string;
//   age1: number;
// };
// type b = {
//   name2: string;
//   age2: number;
// };
// type c = a & b;
// const cc: c = {
//   name1: "",
//   age1: 0,
//   name2: "",
//   age2: 0,
// };
// type d = a | b;
// const dd: d = {
//   name1: "",
//   age1: 0,
// };

// type a = string & number;
// type c = any
// const cc:c = 1
// const aa:a = cc
// //索引签名
// type A1 = {
//   [k: string]: number;
// };
// //Record泛型
// type A2 = Record<string, number>;

// const a1: A1 = {
//   age: 18,
//   age1: 19,
// };
// console.log("a1", a1);
// const a2: A2 = {
//   age: 18,
// };

// type AAA = string
// type BBB = AAA //B为string

// interface C extends Date{}
// type D = C

type A = {
	name: string;
};
type B = {
	age: number;
};
type C = A | B;
const d = {
	name: "frank",
	gender: "男"
};
const c: C = d;
console.log("🚀 ~ file: study.ts:165 ~ c", c);
export {};
