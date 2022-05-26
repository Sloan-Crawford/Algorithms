// From JS Algorithm Crash Course by Academind:
// https://www.youtube.com/watch?v=JgWm6sQwS_I&ab_channel=Academind

// Practice:

// 1. write an algorithm that takes an array of numbers as input and calculates the sum of those numbers

function sumNumbers(numbers) {
 let total = 0; // 1 execution
 for (let num of numbers) { // 1 execution for initialization of a loop
  total += num; // number executions => n (3 in the example below)
 }
return total; // 1 execution
}

// check:
console.log(sumNumbers([1,3,10])); // -> 14...[Done] exited with code=0 in 0.05 seconds
// time commplexity: count the executions above. T = 1 + 1 + n + 1 = 3 + 1n = n
// = O(n) => linear

// can we do better?

function sumNumbers(numbers) {
 return numbers.reduce((sum, curNum) => sum + curNum, 0);
}

// check:
console.log(sumNumbers([1,3,10])); // -> 14...[Done] exited with code=0 in 0.05 seconds
// time commplexity: count the executions above. reduce method imitates a loop so it doesn't reduce complexity
// when using methods, we would need to look up each method to see it's time complexity
// = O(n) => linear still