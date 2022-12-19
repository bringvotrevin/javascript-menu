const { Random } = require('@woowacourse/mission-utils');

const RandomMaker = {
  category() {
    return Random.pickNumberInRange(1, 5) - 1;
  },

  menu(menuList) {
    const list = menuList.map((_, index) => index + 1);
    const num = Random.shuffle(list)[0];
    // console.log('num : ', num);
    return menuList[num - 1];
  },
};

module.exports = RandomMaker;
