(function() {
  // 权限控制

  // 封装授权数据中重复出现部分的享元对象
  class AuthorizationFlyweight {
    constructor(state) {
      this.parts = state.split(",");
      // 内部状态， 安全实体
      this.securityEntity = this.parts[0];
      // 内部状态，权限
      this.permit = this.parts[1];
    }

    getSecurityEntity() {
      return this.securityEntity;
    }
    getPermit() {
      return this.permit;
    }
    match(security, perm) {
      return this.securityEntity === security && this.permit === perm;
    }
    toString() {
      return this.securityEntity + "," + this.permit;
    }
  }

  // 享元工厂，通常实现称为单例
  var FlyweightFactory = {
    fsMap: {},
    getFlyweight: function(key) {
      var f = this.fsMap[key];

      if (f == null) {
        f = new AuthorizationFlyweight(key);
        this.fsMap[key] = f;
      }
      return f;
    }
  };

  function isEmptyObj(obj) {
    for (var i in obj) return false;
    return true;
  }

  // 安全管理
  var SecurityMgr = {
    map: {},
    // 模拟登录
    login: function(user) {
      this.map[user] = this.queryByUser(user);
    },
    // 判断用户对某个安全实体是否拥有权限
    hasPermit: function(user, securityEntity, permit) {
      var col = this.map[user];

      if (col == null || isEmptyObj(col)) {
        console.log(user + "没有登录或是没有被分配任何权限");
        return false;
      }

      for (var i in col) {
        if (!col.hasOwnProperty(i)) continue;

        var flyweight = col[i];
        console.log("flyweight == " + flyweight);

        if (flyweight.match(securityEntity, permit)) return true;
      }

      return false;
    },
    // 从数据库中获取某人所拥有的权限
    queryByUser: function(user) {
      var col = [];

      for (var i in DataBase) {
        var s = DataBase[i];
        var ss = s.split(",");

        if (ss[0] === user) {
          var fm = FlyweightFactory.getFlyweight(ss[1] + "," + ss[2]);
          col.push(fm);
        }
      }

      return col;
    }
  };

  // mock data
  var DataBase = [
    "张三,人员列表,查看",
    "李四,人员列表,查看",
    "李四,资薪数据,查看",
    "李四,资薪数据,修改"
  ];

  for (var i = 0; i < 3; i++) {
    DataBase.push("张三" + i + ",人员列表,查看");
  }

  new function() {
    SecurityMgr.login("张三");
    SecurityMgr.login("李四");
    var f1 = SecurityMgr.hasPermit("张三", "资薪数据", "查看");
    var f2 = SecurityMgr.hasPermit("李四", "资薪数据", "查看");

    console.log("f1 == " + f1);
    console.log("f2 == " + f2);

    for (var i = 0; i < 3; i++) {
      SecurityMgr.login("张三" + i);
      SecurityMgr.hasPermit("张三" + i, "资薪数据", "查看");
    }
  }();
})();
