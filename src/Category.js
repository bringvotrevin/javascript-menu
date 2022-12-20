const Menu = require('./Menu');
const { CATEGORY } = require('./Constants');

class Category {
  #categoryList = [];

  constructor(sampleMenu) {
    this.#categoryList = CATEGORY.map((category) => new Menu(category));
    this.#categoryList.forEach((menu) => {
      menu.setList(sampleMenu[menu.name]);
    });
  }

  getCategoryList() {
    return this.#categoryList;
  }

  getMenuList(category) {
    let menuList;
    this.#categoryList.forEach((cur) => {
      if (category === cur.name) menuList = cur.list;
    });
    return menuList;
  }

  pickValidCategory(randomCategoryMaker) {
    const category = randomCategoryMaker();
    if (Category.isValidCategory(this.#categoryList[category])) {
      this.#categoryList[category].count += 1;
      return category;
    }
    this.pickValidCategory(randomCategoryMaker);
  }

  static isValidCategory(category) {
    if (category.count < 3) return true;
    return false;
  }
}

module.exports = Category;
