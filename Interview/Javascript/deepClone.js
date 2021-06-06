/**
 * 基础类型，浅复制，在栈复制值
 * 数组的复制：slice、concat、...、数组本身是深复制，但是里面的对象元素是浅复制
 * 对象的复制：Object.assign、...是浅复制。
 * 函数如何复制？ ---> 忽略吧
 * Symbol如何单独复制？ ---> 忽略吧
 * 
 * 深拷贝：考虑数组和对象的情况
 * 1. 如果非数组、非对象的情况，直接浅复制
 * 2. 如果遇到数组、对象，递归处理
 *  2.1 需要处理循环引用的问题--> hash --> map与weakmap的区别：weakmap的key只能是对象，而且是弱引用，不会考虑进垃圾回收 --> 如何用数组mock：其实就是多了一层string的key --> 考虑什么什么set、get、has
 *  2.2 递归的方法，容易爆栈；把递归改写成栈：方式都是开始有一个初始栈，然后while循环，先pop，遇到对象/数组就push，需要考虑值是怎么赋值与传递的
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

// var a = {
//   name: "muyiy",
//   book: {
//     title: "You Don't Know JS",
//     price: "45",
//   },
//   a1: undefined,
//   a2: null,
//   a3: 123,
// };
// var b = cloneShallow(a);

// a.name = "高级前端进阶";
// a.book.price = "55";

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

// 处理循环引用，递归，深度优先遍历
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

// a.circleRef = a;
// let c = cloneDeep3(a);
// console.log(c);

// 处理爆栈，其实就是将迭代写成栈方法，广度优先遍历
function cloneDeep5(source, hash = new WeakMap()) {
  if (!isArrayOrObject(source)) return source;
  let target = Array.isArray(source) ? [] : {};
  let stack = [
    {
      parent: target,
      data: source,
    },
  ];
  hash.set(source, target)
  while (stack.length) {
    let node = stack.pop();
    let parent = node.parent;
    let data = node.data;
    for (let key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        if (isArrayOrObject(data[key])) {
          if (hash.has(data[key])) {
            parent[key] = hash.get(data[key]);
          } else {
            parent[key] = Array.isArray(data[key]) ? [] : {};
            hash.set(data[key], parent[key])
            stack.push({
              parent: parent[key],
              data: data[key],
            });
          }
        } else {
          parent[key] = data[key];
        }
      }
    }
  }
  console.log(hash);
  return target;
}

var a = {
  name: "muyiy",
  book: {
    title: "You Don't Know JS",
    price: "45",
    god: {
      isgirl: true,
    },
  },
  c: {
    fuck: 1,
  },
  a1: undefined,
  a2: null,
  a3: 123
};
a.shit = a
var b = cloneDeep5(a);
console.log(b);

var c = ['a', true, 2, {omg: 1}]
var d = cloneDeep5(c)
console.log(d)

// TODO: 树的深度遍历 迭代 & stack方法

// https://segmentfault.com/a/1190000016672263
// https://github.com/yygmind/blog/issues/29


// 