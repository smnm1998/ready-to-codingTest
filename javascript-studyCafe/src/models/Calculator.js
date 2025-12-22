import { ROOMS } from '../constants/Data.js';

class Calculator {
  constructor() {
    this.priceValue = [
      ROOMS.LAVENDER.price,
      ROOMS.SAGE.price,
      ROOMS.PEPPERMINT.price,
    ];
  }

  // 주말 할증 총 금액의 10%
  calculateWeekendCharge(calculateResult, day) {
    const isWeekend = day === 0 || day === 6;

    if (isWeekend) {
      return calculateResult * 0.1;
    }

    return 0;
  }

  calculateNightCharge({ start, end }, reservationRoom) {
    if (end <= 1200) {
      return { hours: 0, charge: 0 };
    }

    const priceValues = Object.values(ROOMS).find(
      (chk) => chk.name === reservationRoom,
    );

    const nightStart = Math.max(start, 1200);
    const nightMinutes = end - nightStart;
    const nightHours = nightMinutes / 60;

    if (priceValues) {
      const charge = priceValues.price * nightHours * 0.1;
      return { hours: nightHours, charge };
    }

    return { hours: 0, charge: 0 };
  }

  calculateRunningTime({ start, end }) {
    const result = (end - start) / 60;
    return result;
  }

  // 총 금액 계산
  calculateTotalPrice({ start, end }, reservationRoom) {
    const priceValues = Object.values(ROOMS).find(
      (chk) => chk.name === reservationRoom,
    );

    if (priceValues) {
      const hours = (end - start) / 60;
      return hours * priceValues.price;
    }

    return 0;
  }

  // 할증 더한 총 금액
  calculateChargeAddAmount(calculateResult, weekendCharge, nightCharge) {
    return calculateResult + weekendCharge + nightCharge;
  }

  // 최종 결제 금액
  calculateFinalPaymentAmount(
    calculateResult,
    weekendCharge,
    nightCharge,
    discountHours,
  ) {
    return (
      calculateResult + (weekendCharge + nightCharge.charge - discountHours)
    );
  }
}

export default Calculator;
