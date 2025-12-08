import { DRINKS, DESSERTS } from '../constants/Menu.js';
import { ERROR_MESSAGES } from '../constants/ErrorMessages.js';

class Validator {
  validatePlaceFormat(place) {
    if (!place || place.trim() === '') {
      throw new Error(ERROR_MESSAGES.INVALID_PLACE);
    }

    const trimmed = place.trim();
    if (trimmed !== '매장' && trimmed !== '포장') {
      throw new Error(ERROR_MESSAGES.INVALID_PLACE);
    }
  }

  validateOrderFormat(orderString) {
    const items = orderString.trim().split(',');
    for (const item of items) {
      if (item.split('-').length !== 2) {
        throw new Error(ERROR_MESSAGES.INVALID_ORDER);
      }

      const [name, countStr] = item.split('-');

      if (!name || name.trim() === '') {
        throw new Error(ERROR_MESSAGES.INVALID_ORDER);
      }

      const count = Number(countStr);
      if (isNaN(count)) {
        throw new Error(ERROR_MESSAGES.INVALID_ORDER);
      }
    }
  }

  validateNoDuplicates(items) {
    const menuNames = items.map((item) => item.name);
    const uniqueNames = new Set(menuNames);

    if (menuNames.length !== uniqueNames.size) {
      throw new Error(ERROR_MESSAGES.INVALID_ORDER);
    }
  }

  validateMenuExists(items) {
    const allMenu = { ...DRINKS, ...DESSERTS };
    for (const item of items) {
      if (!(item.name in allMenu)) {
        throw new Error(ERROR_MESSAGES.INVALID_ORDER);
      }
    }
  }

  validateQuantity(items) {
    for (const item of items) {
      if (item.count < 1) {
        throw new Error(ERROR_MESSAGES.INVALID_ORDER);
      }
    }

    const totalCount = items.reduce((sum, item) => sum + item.count, 0);
    if (totalCount > 20) {
      throw new Error(ERROR_MESSAGES.INVALID_ORDER);
    }
  }
}

export default Validator;
