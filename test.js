let data = {
  category:{
    "생필품":[{
      id:"1"
    },{
      id:"2"
    }],
    "양아치":[{
      name:"soso"
    }]
  }
}

let result = Object.keys(data.category).includes("생필품") ? {
  ["생필품"]: data.category.생필품.filter((item) => item.id !== "2")
}:"?";

console.log(data.category.생필품 = result);

console.log(result, data.category.생필품);


// console.log([1,2,3,4,5].includes(6));
