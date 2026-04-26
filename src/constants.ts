import { Topic } from './types';

export const TOPICS: Topic[] = [
  {
    id: 'data-types',
    category: 'Fundamentals',
    title: 'Data Types & Variables',
    content: 'In AS Level Computer Science, understanding memory allocation through variables is key. JavaScript uses `let` for block-scoped variables and `const` for constants. Avoid `var` as it lacks block scope, which can lead to logical errors in exam pseudo-code translation.',
    exampleCode: `// Declaring variables
const pi = 3.14159;
let radius = 5;
let area = pi * (radius ** 2);

console.log("Radius:", radius);
console.log("Area of Circle:", area);

// Scope Example
if (true) {
  let localScope = "I stay inside this block";
  console.log(localScope);
}
// console.log(localScope); // This would cause an error!`,
    pitfalls: [
      "Confusing '=' (assignment) with '==' or '===' (comparison).",
      "Using 'var' instead of 'let', leading to hoisted variable issues.",
      "Attempting to reassign a 'const' variable."
    ],
    pseudoCode: `CONSTANT PI <- 3.14159
DECLARE Radius : INTEGER
DECLARE Area : REAL
Radius <- 5
Area <- PI * (Radius ^ 2)
OUTPUT Area`
  },
  {
    id: 'operators',
    category: 'Fundamentals',
    title: 'Operators',
    content: 'Operators allow us to manipulate data. You must distinguish between arithmetic (+, -, *, /, %), logical (&&, ||, !), and comparison (==, !=, >, <, >=, <=).',
    exampleCode: `let x = 10;
let y = 3;

console.log("Addition:", x + y);
console.log("Modulus (Remainder):", x % y);
console.log("Is x greater than y AND y positive?", (x > y) && (y > 0));`,
    pitfalls: [
      "Using '=' when you mean '=='.",
      "Forgetting that '%' returns the remainder, not the quotient.",
      "Logical operator precedence: '!' is evaluated before '&&', which is evaluated before '||'."
    ]
  },
  {
    id: 'selection',
    category: 'Control Structures',
    title: 'Selection (If/Switch)',
    content: 'Selection statements allow the program to take different paths. In exams, you often need to nested If statements or use Case (Switch) for multiple discrete options.',
    exampleCode: `let score = 85;

if (score >= 90) {
  console.log("Grade: A*");
} else if (score >= 80) {
  console.log("Grade: A");
} else {
  console.log("Grade: B or below");
}

let day = "Monday";
switch(day) {
  case "Monday":
    console.log("Start of the week!");
    break;
  default:
    console.log("Midweek blues...");
}`,
    pitfalls: [
      "Forgetting 'break' in a switch statement (leads to fall-through).",
      "Incorrectly indexing 'else' blocks in nested Ifs.",
      "Using 'else if' when multiple conditions could be true simultaneously (should be separate 'if's)."
    ]
  },
  {
    id: 'iteration',
    category: 'Control Structures',
    title: 'Iteration (Loops)',
    content: 'Loops repeat code blocks. AS level focuses on count-controlled (For) and condition-controlled (While, Do-While) loops.',
    exampleCode: `console.log("Count-controlled:");
for (let i = 1; i <= 5; i++) {
  console.log("Number:", i);
}

console.log("\\nCondition-controlled:");
let count = 0;
while (count < 3) {
  console.log("Count is:", count);
  count++;
}`,
    pitfalls: [
      "Infinite loops: forgetting to increment the counter in a 'while' loop.",
      "Off-by-one errors: starting at 0 vs 1 or using '<' vs '<='.",
      "Do-While loops always execute at least once, even if the condition is false initially."
    ]
  },
  {
    id: 'arrays',
    category: 'Data Structures',
    title: 'Arrays (1D)',
    content: 'An array is a collection of elements of the same type (in pseudo-code) or any type (in JS). Indexing starts at 0.',
    exampleCode: `let students = ["Alice", "Bob", "Charlie"];

console.log("First student:", students[0]);
console.log("Array length:", students.length);

for (let i = 0; i < students.length; i++) {
  console.log("Student at index " + i + ":", students[i]);
}`,
    pitfalls: [
      "Accessing 'array[length]' which is undefined (last index is length - 1).",
      "Treating an array like a single variable instead of a collection.",
      "Forgetting that arrays are zero-indexed."
    ]
  },
  {
    id: 'functions',
    category: 'Control Structures',
    title: 'Functions & Parameters',
    content: 'Functions promote modularity. You should understand the difference between parameters (inputs) and return values (outputs).',
    exampleCode: `function calculateTotal(price, tax) {
  let total = price + (price * tax);
  return total;
}

let myBill = calculateTotal(100, 0.2);
console.log("Total Bill:", myBill);`,
    pitfalls: [
      "Confusing 'return' with 'console.log' (returning sends data back to the caller).",
      "Mismatching numbers of arguments when calling a function.",
      "Scope: Variables declared inside a function are not accessible outside."
    ]
  },
  {
    id: 'dom',
    category: 'The DOM',
    title: 'DOM Interaction',
    content: 'Document Object Model (DOM) is how JavaScript interacts with HTML. You can select elements, change their content, and respond to events.',
    exampleCode: `// NOTE: This playground mocks the DOM for safety.
// Actual usage:
// document.getElementById('my-btn').onclick = () => { ... }
// document.getElementById('output').innerHTML = 'Hello!';

console.log("Selecting element by ID...");
console.log("Updating innerHTML...");
console.log("Attaching event listeners...");`,
    pitfalls: [
      "Trying to access the DOM before it has loaded.",
      "Spelling errors in 'getElementById' (it is case sensitive).",
      "Not using '.value' to get text from an input field."
    ]
  }
];
