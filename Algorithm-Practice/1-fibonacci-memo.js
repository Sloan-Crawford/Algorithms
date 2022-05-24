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

console.log(fib(6)); // 8
console.log(fib(7)); // 13
console.log(fib(8)); // 21
console.log(fib(50)); // 12586269025... this one takes a really long time (110sec), so too slow

// it has correctness so far, but lacks efficiency...

// let's improve the implementation (draw it first!)
// *look at fib sum tree in images
//...

// this will have a time complexity of O(2^n) (exponential[bad])
// meaning fib(50) = 2^50 steps, which is over 1 quadrillion steps

// things to consider: Base Case and Recursive Case

// the bottleneck comes from the time complexity, which stems from the number of recursive calls made
// so I need to look for any patterns in the recursive nature of the problem
// patterns of overlapping subproblems is known as Dynamic Programming. This can be applied when we have some larger problem (i.e., Fibonacci) and we can decompose it into smaller instances of the same problem, with an overlapping structure:

// 1. calculate duplicate sub problems
// 2. store those to be used later
// 3. do this through memoization (memos or notes)
// In JS use a JS object as a fast-access data structure (like a hashmap equivalent):
// The keys will be arguments to the function, the values will be the return values
// the memo is going to store n as the key and the values are the return values for the function.
// first, check for existence inside our memo with if statement (add an additional base case)
// if it does, return the value that corresponds to that memo's key
// store the entire result inside my memo (the key is always what was used as the argument)
// make sure all the recursive function calls are accesing the same memo so pass in that object as additional arguments to both of the calls
// in sum, I added a new argument, a new base case, and memo storing logic

const fib = (n, memo = {}) => {
 if (n in memo) return memo[n];
 if (n <= 2) return 1;
 
 memo[n] = fib(n-1, memo) + fib(n-2, memo);
 return memo[n];
}

console.log(fib(6));
console.log(fib(7));
console.log(fib(8));
console.log(fib(50));

// [Done] exited with code=0 in 0.281 seconds!