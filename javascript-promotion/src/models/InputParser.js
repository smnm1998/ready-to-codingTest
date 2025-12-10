import { APPETIZER, MAINDISH, DRINKS, DESSERTS } from '../constants/Menu.js';

class InputParser {
  // 주문내역 파싱
  parsedOrder(menuAndCount) {
    const items = menuAndCount.trim().split(',');
    return items.map((item) => {
      const [name, countStr] = item.trim().split('-');
      return {
        name: name.trim(),
        count: Number(countStr),
      };
    });
  }

  calculateTotal(items) {
    const allMenu = { ...APPETIZER, ...MAINDISH, ...DRINKS, ...DESSERTS };
    return items.reduce((total, item) => {
      return total + (allMenu[item.name] || 0) * item.count;
    }, 0);
  }

  countDesserts(orderItems) {
    return orderItems.reduce((count, item) => {
      if (item.name in DESSERTS) {
        return count + item.count;
      }
      return count;
    }, 0);
  }

  countMainDish(orderItems) {
    return orderItems.reduce((count, item) => {
      if (item.name in MAINDISH) {
        return count + item.count;
      }
      return count;
    }, 0);
  }

  calculateTotalDiscount(benefits) {
    return Object.values(benefits).reduce((sum, value) => sum + value, 0);
  }

  calculateResult(totalCalculate, benefits) {
    const actualDiscount =
      benefits.christmas +
      benefits.weekday +
      benefits.weekend +
      benefits.special;
    return totalCalculate - actualDiscount;
  }
}

export default InputParser;
