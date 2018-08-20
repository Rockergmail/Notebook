'use strict';

const Controller = require('egg').Controller;
const path = require('path');

class HomeController extends Controller {
  async index() {
    // await this.ctx.render(path.resolve(__dirname, '../public/index.html'), {});
    // await this.ctx.renderView('index.html');
    await this.ctx.render('index.html', {});
  }
}

module.exports = HomeController;
