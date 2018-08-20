'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async root() {
    this.ctx.body = 'hi, egg';
  }
}

module.exports = HomeController;
