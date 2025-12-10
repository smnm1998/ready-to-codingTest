import { ERROR_MESSAGES } from '../constants/ErrorMessage.js';
import { APPETIZER, MAINDISH, DESSERTS, DRINKS } from '../constants/Menu.js';

class Validator {
  validateTotalLimit(totalCalculate) {
    if (totalCalculate < 12000) {
      throw new Error(ERROR_MESSAGES.COMMON_DISCOUNT);
    }
  }

  validateVisitDateLimit(visitDate) {
    if (visitDate < 1 || visitDate > 31) {
      throw new Error(ERROR_MESSAGES.DATE_ERROR);
    }
  }

  validateNotInMenu(parsedOrders) {
    const allMenu = { ...APPETIZER, ...MAINDISH, ...DESSERTS, ...DRINKS };
    for (const order of parsedOrders) {
      if (!(order.name in allMenu)) {
        throw new Error(ERROR_MESSAGES.MENU_ERROR);
      }
    }
  }

  validateOrderFormat(orderString) {
    const items = orderString.trim().split(',');
    for (const item of items) {
      const trimmedItem = item.trim();
      if (trimmedItem.split('-').length !== 2) {
        throw new Error(ERROR_MESSAGES.MENU_COUNT_ERROR);
      }

      const [name, countStr] = trimmedItem.split('-');

      if (!name || name.trim() === '') {
        throw new Error(ERROR_MESSAGES.COMMON_ERROR);
      }

      const count = Number(countStr);
      if (isNaN(count)) {
        throw new Error(ERROR_MESSAGES.COMMON_ERROR);
      }
    }
  }

  validateDuplicateMenu(parsedOrders) {
    const menuNames = parsedOrders.map((order) => order.name);
    const uniqueNames = new Set(menuNames);
    if (menuNames.length !== uniqueNames.size) {
      throw new Error(ERROR_MESSAGES.TOTAL_ORDER_ERROR);
    }
  }

  validateTotalCount(parsedOrders) {
    const totalCount = parsedOrders.reduce(
      (sum, order) => sum + order.count,
      0,
    );
    if (totalCount > 20) {
      throw new Error(ERROR_MESSAGES.ORDER_COUNT_ERROR);
    }
  }

  validateCountMinimum(parsedOrders) {
    for (const order of parsedOrders) {
      if (order.count < 1) {
        throw new Error(ERROR_MESSAGES.ORDER_COUNT_ERROR);
      }
    }
  }

  validateNotOnlyDrinks(parsedOrders) {
    const isDrink = (name) => name in DRINKS;
    const allDrinks = parsedOrders.every((order) => isDrink(order.name));
    if (allDrinks) {
      throw new Error(ERROR_MESSAGES.DRINKS_ORDER_ERROR);
    }
  }
}

export default Validator;
