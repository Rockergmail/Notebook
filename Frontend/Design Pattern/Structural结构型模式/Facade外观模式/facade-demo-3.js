// DOM中的例子
var DED = window.DED || {};
DED.util = {
  stopPropagation: function(e) {
    if (e.stopPropagation) {
      // w3 interface
      e.stopPropagation();
    } else {
      // IE's interface
      e.cancelBubble = true;
    }
  },
  preventDefault: function(e) {
    if (e.preventDefault) {
      e.preventDefault();
    } else {
      e.returnValue = false;
    }
  },
  // our convenience method
  stopEvent: function(e) {
    DED.util.stopPropagation(e);
    DED.util.preventDefault(e);
  }
};

// 示例： 设置HTML元素的样式
function setStyle(elements, prop, val) {
  for (var i = 0, len = elements.length; i < len; i++) {
    document.getELementById(elements[i]).style[prop] = val;
  }
}
setStyle(["foo"], "position", "absolute");

function setCSS(el, styles) {
  for (var prop in styls) {
    if (!styls.hasOwnProperty(prop)) {
      continue;
    }
    setStyle(el, prop, styls[prop]);
  }
}
setCSS(["foo", "bar"], {
  position: "absolute",
  top: "50px",
  left: "300px"
});

// 示例： 跨浏览器事件侦听器
function addEvent(el, type, fn) {
  if (window.addEventListener) {
    el.addEventListener(type, fn, false);
  } else if (window.attachEvent) {
    el.attachEvent("on" + type, fn);
  } else {
    el["on" + type] = fn;
  }
}

// 示例： 设计一个事件工具
DED.util.Event = {
  getEvent: function(e) {
    return e || window.event;
  },
  getTarget: function(e) {
    e = this.getEvent(e);
    return e.target || e.srcElement;
  },
  stopPropagation: function(e) {
    e = this.getEvent(e);
    if (e.stopPropagation) {
      e.stopPropagation();
    } else {
      e.cancelBubble = true;
    }
  },
  preventDefault: function(e) {
    e = this.getEvent(e);
    if (e.preventDefault) {
      e.preventDefault();
    } else {
      e.returnValue = false;
    }
  },
  stopEvent: function(e) {
    this.stopPropagation(e);
    this.preventDefault(e);
  }
};

addEvent($("example"), "click", function(e) {
  console.log(DED.util.Event.getTarget(e));
  DED.util.Event.stopEvent(e);
});
