const app = document.querySelector('#app');

// 결과를 표시할 요소 생성
const resultElement = document.createElement('div');
resultElement.style.fontSize = '18px';
resultElement.style.margin = '20px';
resultElement.style.fontFamily = 'Arial, sans-serif';

// 결과 텍스트 설정
const text = document.createTextNode('자바스크립트 실행 결과:');
resultElement.appendChild(text);

// 결과 영역을 app에 추가
app.appendChild(resultElement);

// 콘솔 로그 결과를 화면에도 표시하는 함수
function displayLog(message) {
  const logElement = document.createElement('p');
  logElement.style.margin = '5px 0';
  logElement.textContent = message;
  resultElement.appendChild(logElement);
}

// console.log와 console.error를 오버라이드하여 화면에도 표시되도록 설정
const originalConsoleLog = console.log;
const originalConsoleError = console.error;

console.log = function (...args) {
  originalConsoleLog.apply(console, args);
  displayLog(args.join(' '));
};

console.error = function (...args) {
  originalConsoleError.apply(console, args);
  displayLog('Error: ' + args.join(' '));
};

const isAdmin = false;

const target = {
  name: '홍길동',
  age: 20,
  gender: '남자',
  address: '서울시 강남구',
  phone: '010-1234-5678',
  email: 'hong@example.com',
  job: '개발자',
  hobby: '축구',
};

const proxy = new Proxy(target, {
  get(target, property) {
    console.log(`${property} 접근`);
    return target[property];
  },
  set(target, property, value) {
    if (!isAdmin) {
      console.error('관리자만 수정 가능합니다.');
      return target[property];
    }
    if (property === 'age') {
      if (value > 100) {
        console.error('나이는 100 이하여야 합니다.');
        return target[property];
      }
    }
    console.log(`${property} 값 할당: ${value}`);
    return (target[property] = value);
  },
});

proxy.name = '이순신';
console.log(proxy.age);
proxy.age = 101;
console.log(proxy.age);
