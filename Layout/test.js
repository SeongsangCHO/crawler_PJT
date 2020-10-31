function solution(n, delivery) {
  let answer = '';
  let tmp = new Array(n).fill('?');
  //재고가 있는 것 확인 = O
  delivery.forEach((value, idx) => {
    if (value[2] == 1){
      tmp[value[0] - 1] = 'O';
      tmp[value[1] - 1] = 'O';
    }
  });

  delivery.forEach((value, idx) =>{
    if (value[2] == 0 && (tmp[value[0] - 1] == 'O'
    && !(tmp[value[1] - 1] == 'O'))){
      tmp[value[1] - 1] = 'X';
    }
    if (value[2] == 0 && (tmp[value[1] - 1] == 'O'
    && !(tmp[value[0] - 1] == 'O'))){
      tmp[value[0] - 1] = 'X';
    }
  });
  
  return  tmp.join('');
}

