import { DRINKS, DESSERTS } from '../constants/Menu.js';

class Order {
  // 배열로 파싱
  parseOrder(orderString) {
    const items = orderString.trim().split(',');
    return items.map((item) => {
      const [name, count] = item.split('-');
      return { name, count: Number(count) };
    });
  }

  // 총 금액 계산
  calculateTotal(items) {
    const allMenu = { ...DRINKS, ...DESSERTS };
    return items.reduce((total, item) => {
      return total + allMenu[item.name] * item.count;
    }, 0);
  }

  // 음료 개수
  countBeverages(items) {
    return items
      .filter((item) => item.name in DRINKS)
      .reduce((sum, item) => sum + item.count, 0);
  }

  // 디저트 개수
  countDessert(items) {
    return items
      .filter((item) => item.name in DESSERTS)
      .reduce((sum, item) => sum + item.count, 0);
  }
}

export default Order;
