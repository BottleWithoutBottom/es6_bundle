
  function cleanerStr(str) {
    return str.trim().replace(/ +/g, ' ')
    //(/ +/g) - один пробел легален, остальные будут игнорироваться
  }

  function breakSentense(str) {
    return cleanerStr(str).split(' ').length;
  }

  function* getWordsWithoutArrays(str) {
    let text = cleanerStr(str) + " ";
    let startPos = 0;
    let currentPos = text.indexOf(" ", startPos);
    while (currentPos !== -1) {
      yield text.substr(startPos, currentPos - startPos) ;
      startPos = currentPos + 1;
      currentPos = text.indexOf(" ", startPos); 
    }
  }

export {cleanerStr, getWordsWithoutArrays}