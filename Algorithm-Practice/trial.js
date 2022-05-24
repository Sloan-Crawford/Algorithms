const howSum = (targetSum, numbers) => {
 const table = Array(targetSum + 1).fill(null); // 1. size the table based on input that changes (targetSum)
 // 2. and initialize table with all null values
 table[0] = []; // 3. seed index 0 with empty array

 for (let i=0; i<=targetSum; i++) { // 4. start iteration loop at 0, go to TARGETSUM ONLY, increment by 1
  if (table[i] !== null) { // 4. check if value is not null. only if it isn't, look forward
   for (let num of numbers) { 
    table[i+num] = ([...table[i], num]);
   }
  }
 }
 return table[targetSum];
}

console.log(howSum(7, [2,3])); // -> [3,2,2]
console.log(howSum(7, [5,3,4,7])); // -> [3,4] one possible answer is adding 3+4, or just take 7
console.log(howSum(8, [2,3,5])); // -> [2,2,2,2] or [3,5]
console.log(howSum(7, [2,4])); // -> null since it's not possible
console.log(howSum(300, [7,14])); // -> null