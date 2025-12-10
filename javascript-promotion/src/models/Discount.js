import { DECEMBER_CALLENDER, SPECIAL_DAY } from '../constants/Date.js';

class Discount {
  christmasDiscount(visitDate) {
    if (visitDate > 25) {
      return 0;
    }
    const defaultDiscount = 1000;
    const discountAmount = defaultDiscount + (visitDate - 1) * 100;
    return discountAmount;
  }

  weekdayDiscount(visitDate, dessertsCount) {
    const dayOfWeek = DECEMBER_CALLENDER[visitDate];
    // 평일: 일요일~목요일 (디저트 할인)
    if (dayOfWeek !== '금' && dayOfWeek !== '토') {
      const defaultDiscount = 2024;
      return defaultDiscount * dessertsCount;
    }
    return 0;
  }

  weekendDiscount(visitDate, mainDishCount) {
    const dayOfWeek = DECEMBER_CALLENDER[visitDate];
    // 주말: 금요일, 토요일 (메인 할인)
    if (dayOfWeek === '금' || dayOfWeek === '토') {
      const defaultDiscount = 2024;
      return defaultDiscount * mainDishCount;
    }
    return 0;
  }

  specialDiscount(visitDate) {
    if (visitDate in SPECIAL_DAY) {
      return 1000;
    }
    return 0;
  }

  giftGiving(total) {
    if (total >= 120000) {
      return 25000;
    }
    return 0;
  }
}

export default Discount;
