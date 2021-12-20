// 匯入剛剛寫的套件
const benchmarker = require('./index');

// 定義一個想要檢驗花費時間的函式
function jsonStringify() {
  JSON.stringify({
    foo: 'bar',
  });
}

// 執行 benchMarker 這個方法，並把想檢驗的函式放進去
const costTime = benchmarker(jsonStringify);
console.log('costTime', costTime);