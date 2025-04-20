import '../util/displayLog.js';

const isAdmin = true;

const target = {
  name: '홍길동',
  age: 20,
  address: '서울시 강남구',
  phone: '010-1234-5678',
  email: 'hong@example.com',
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
    if (property === 'phone') {
      const phoneRegex = /^010-\d{4}-\d{4}$/;
      if (!phoneRegex.test(value)) {
        console.error(
          '올바른 핸드폰 번호 형식이 아닙니다. (예: 010-1234-5678)'
        );
        return target[property];
      }
    }
    if (property === 'email') {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(value)) {
        console.error('올바른 이메일 형식이 아닙니다. (예: example@email.com)');
        return target[property];
      }
    }
    return (target[property] = value);
  },
});

proxy.name = '이순신';
proxy.age = 101;
proxy.phone = '191919-32323-3333';
proxy.email = 'example#email.com';
