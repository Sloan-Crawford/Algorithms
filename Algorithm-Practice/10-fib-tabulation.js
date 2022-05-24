// Fib Tabulation:

// write a function 'fib(n)' that takes in a number as an argument.
// the function should return the n-th number of the Fibonacci sequence.

// The 0th number of the sequence is 0.
// The 1st number of the sequence is 1.

// to generate the next number of the sequence, we sum the previous two.

// n:       1, 2, 3, 4, 5, 6, 7,  8,  9,  ...
// fib(n):  1, 1, 2, 3, 5, 8, 13, 21, 34, ...

// This time, with tabulation, it's all about building a table.

// Example:
fib(6) // -> 8

// Still think about this dynamic programming problem in terms of sub problems,
// instead of doing it recursively, we do it iteratively by building a table (an array)
// the array should be roughly the size of the input. with input of 6, array of length 6 (0-5)
// we want each subproblem to correspond to an element of the array.
// initialize every position in the array to 0. It's a good starting value when calculating a running sum.
// Seed the starting values within the table (values of 0 at 0 and 1 at 1)
// Now iterate through the table...

// Add the value in position 0 to the next two positions in the table. then repeat for value in 1, 2, 3...

// We are just iterating through an array of size n so complexity is LINEAR:
// time complexity =  O(n) time
// space complexity = 0(n) space

// compare table to tree in images

// Let's code it up:
// Start by creating a table (array) with dimensions roughly the size of n:
// Do this by creating an array with the static method and passing in the desired size.
// *array should be (n + 1) so the last index of the array is exactly n (since it's 0 index based)
// assign values into the table using .fill method (0 for all to start)
// fill up a particular value inside of the table. index of 1 should contain a value of 1.
// iterate through the table with a for loop...
// syntax: for ([initialExpression]; [conditionExpression]; [incrementExpression]) {
//  statement }
// Look at the next two positions after i, then add in current value in table to both of them...
// do this by adding exactly what table i says at the moment to both subsequent positions.
// return our answer (the table at position or index n) after for loop


const fib = (n) => {
 const table = Array(n + 1).fill(0);
 table[1] = 1;
 for (let i = 0; i <= n; i++) { // initiate, check if i <= n, execute statement, then increase i by 1...
  table[i + 1] += table[i];
  table[i + 2] += table[i];
 }
 return table[n];
}

console.log(fib(6)); // 8
console.log(fib(7)); // 13
console.log(fib(8)); // 21
console.log(fib(50)); // 12586269025 [Done] exited with code=0 in 0.104 seconds! (faster than memo)

// we can actually optimize to reduce it to a constant amount of space.
// won't do it now, stick with reinforcing classic tabulation process.