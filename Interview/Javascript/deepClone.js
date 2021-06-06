/**
 * 基础类型，直接复制
 * Symbol如何单独复制？
 * 数组如何单独复制？
 * 函数如何复制？
 * 对象，浅复制上述+递归对象，需要考虑互相引用，
 */

function cloneShallow(source) {
  let target = {};

  for (let key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      target[key] = source[key];
    }
  }

  return target;
}

var a = {
  name: "muyiy",
  book: {
    title: "You Don't Know JS",
    price: "45",
  },
  a1: undefined,
  a2: null,
  a3: 123,
};
var b = cloneShallow(a);

a.name = "高级前端进阶";
a.book.price = "55";

// console.log(b);

/**
 * { name: 'muyiy',
  book: { title: 'You Don\'t Know JS', price: '55' },
  a1: undefined,
  a2: null,
  a3: 123 }
 */

function cloneDeep1(source) {
  let target = {};

  for (let key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (typeof source[key] === "object") {
        target[key] = cloneDeep1(source[key]);
      } else {
        target[key] = source[key];
      }
    }
  }

  return target;
}
// 判断object不严谨，没有考虑array的情况
// typeof [] === typeof {} === typeof null === 'object'
// typeof () => {} === 'function'
function isArrayOrObject(item) {
  return typeof item === "object" && item !== null;
}

function cloneDeep2(source) {
  if (!isArrayOrObject(source)) return source;
  let target = Array.isArray(source) ? [] : {};

  for (let key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      target[key] = isArrayOrObject(source[key])
        ? cloneDeep2(source[key])
        : source[key];
    }
  }

  return target;
}

// 处理循环引用
function cloneDeep3(source, hash = new WeakMap()) {
  if (!isArrayOrObject(source)) return source;
  if (hash.has(source)) return hash.get(source);

  let target = Array.isArray(source) ? [] : {};
  hash.set(source, target); // 存的是复制了的value为对象或者数组的，而key是source的value为对象或者数组的
  console.log(hash);

  for (let key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      target[key] = isArrayOrObject(source[key])
        ? cloneDeep3(source[key], hash)
        : source[key];
    }
  }

  return target;
}

a.circleRef = a;
let c = cloneDeep3(a);
console.log(c);

// 处理爆栈，其实就是将迭代写成栈方法
function cloneDeep5(source, hash = new WeakMap()) {
  if (!isArrayOrObject(source)) return source;
  let target = Array.isArray(source) ? [] : {};
  let stack = [
    {
      data: source,
    },
  ];

  while (stack.length) {
    let data = stack[0].data;
    for (let key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
          if (isArrayOrObject(data[key])) {
            stack.push({
                data: data[key]
            }) 
          } else {
            data[key]
          }
        // target[key] = isArrayOrObject(source[key])
        //   ? cloneDeep3(source[key], hash)
        //   : source[key];
      }
    }
  }

  return target;
}

// TODO: 树的深度遍历 迭代 & stack方法

// https://segmentfault.com/a/1190000016672263
// https://github.com/yygmind/blog/issues/29