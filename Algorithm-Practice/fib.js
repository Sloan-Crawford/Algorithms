// Fib Memoization:

// write a function 'fib(n)' that takes in a number as an argument.
// the function should return the n-th number of the Fibonacci sequence.

// notes:
// n:       1, 2, 3, 4, 5, 6, 7,  8,  9,  ...
// Fibonacci sequence: 
// fib(n) = 1, 1, 2, 3, 5, 8, 13, 21, 34, ...

// to generate the next number of the sequence, we sum the previous two.
// we need to solve this RECURSIVELY.

// Recursive originally just meant “continually repeating,” but by the mid-1900s, it had developed a specialized mathematical sense. The math sense relates to the application of a function to its own values to generate an infinite sequence of values. The equation that gives us the famous Fibonacci sequence is such a process.

// From this mathematical usage came the computational application of recursive algorithms: processes that solve a big problem by solving smaller versions of the problem.

// trial 1: test
const fib = (n) => {
 if (n <=2) return 1;
 return fib(n-1) + fib(n-2);
};

console.log(fib(6));
console.log(fib(7));
console.log(fib(8));
console.log(fib(50)); // this one takes a really long time (110sec), so too slow

// it has correctness so far, but lacks efficiency...

// let's improve the implementation (draw it first!)
// *look at fib sum tree in images
//...

// this will have a time complexity of O(2^n) (exponential[bad])
// meaning fib(50) = 2^50 steps, which is over 1 quadrillion steps

// things to consider: Base Case and Recursive Case