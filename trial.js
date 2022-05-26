console.log(sumNumbers([1,3,10])); // -> 14...[Done] exited with code=0 in 0.05 seconds
// time commplexity: count the executions above. T = 1 + 1 + n + 1 = 3 + 1n = n
// = O(n) => linear

// can we do better?

function sumNumbers(numbers) {
 return numbers.reduce((sum, curNum) => sum + curNum, 0);
}