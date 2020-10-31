function get_before_rotate(rotation, encrypted_text) {
  let sliced = "";
  let before_rotate_str = "";
  //양수면 slice구역
  rotation %= encrypted_text.length;
  //앞에서 뒤로 붙이기
  if (rotation == 0)
    return (encrypted_text);
  if (rotation > 0) {
    sliced = encrypted_text.slice(0, rotation);
    before_rotate_str += encrypted_text.slice(rotation) + sliced;
  }
  if (rotation < 0) {
    sliced = encrypted_text.slice(rotation);
    before_rotate_str += sliced + encrypted_text.slice(0, encrypted_text.length - sliced.length);
  }
  return (before_rotate_str);
}

function solution(encrypted_text, key, rotation) {
  var answer = "";
  let rotated_str = "";
  let decrypted_arr = [];
  let key_array = key.split('').map((value, idx) => {
    
    return value.charCodeAt(0)- 97;
  });
  rotated_str = get_before_rotate(rotation, encrypted_text).split('').map((value) =>{
    console.log(value);
    return value.charCodeAt(0) - 97;
  });
  
  decrypted_arr = rotated_str.map((value, idx) => {
    let returned = value - key_array[idx];
    if (returned < 0)
      returned += 26;
    return String.fromCharCode(returned + 96);
  });
  
  //각 answer의 문자열을 key_array에 대응되는 값이랑 변환
  // c 에서 2만큼 되돌아가기 -> c - 2 = a
  // c 에서 3만큼 되돌아가기 -> c - 3 = z가 되도록
  // answer도 숫자로 변환해서 answer - key_array한다음 음수값에다가는 27을 더하기 => 최종 배열에서 number to string
  
  
  console.log(decrypted_arr.join(''));
  
  return decrypted_arr.join('');
}

solution(	"tvfbqyyigop", "abcdefghijk", -15);