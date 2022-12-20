const { Console } = require('@woowacourse/mission-utils');
const Coach = require('./Coach');
const OutputView = require('./Views/OutputView');
const InputView = require('./Views/InputView');
const RandomMaker = require('./RandomMaker');
const { MESSAGE, DAYS } = require('./Constants');
const Category = require('./Category');
const { validateCoaches, validateAvoidMenu } = require('./Validate');

class MenuController {
  constructor(sampleMenu) {
    this.setMenu(sampleMenu);
    this.saveCategory = [];
  }

  setMenu(sampleMenu) {
    this.category = new Category(sampleMenu);
  }

  start() {
    OutputView.printMessage(MESSAGE.START);
    InputView.readCoachName(this.setCoaches.bind(this));
  }

  setCoaches(coaches) {
    validateCoaches(coaches);
    this.coachList = coaches.split(',').map((coach) => new Coach(coach));
    this.setCoachCount = 0;
    this.setAvoids();
  }

  setAvoids(avoidMenu) {
    if (this.setCoachCount !== 0) {
      validateAvoidMenu(avoidMenu);
      this.coachList[this.setCoachCount - 1].setAvoidMenu(avoidMenu);
    }
    if (this.setCoachCount === this.coachList.length) return this.recommandMenu();
    InputView.readAvoidMenu(this.coachList[this.setCoachCount++].name, this.setAvoids.bind(this));
  }

  recommandMenu() {
    this.pickCategory();
    this.pickMenu();
    this.result();
  }

  pickCategory() {
    DAYS.forEach(() => {
      const categoryList = this.category.getCategoryList();
      const randomCategory = this.category.pickValidCategory(RandomMaker.category);
      this.saveCategory.push(categoryList[randomCategory].name);
    });
  }

  pickMenu() {
    this.coachList.forEach((coach) => {
      DAYS.forEach((_, index) => {
        const curMenuList = this.category.getMenuList(this.saveCategory[index]);
        coach.setDailyMenu(curMenuList, RandomMaker.menu);
      });
    });
  }

  result() {
    OutputView.printResult(this.coachList, this.saveCategory);
    Console.close();
  }
}

module.exports = MenuController;
