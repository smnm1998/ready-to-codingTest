class Discount {
  // 4시간 이상 이용시 5% 할인
  discountLongUse(runningTime, chargeAddAmount) {
    let discountResult = 0;
    if (runningTime >= 4) {
      discountResult = chargeAddAmount * 0.05;
      return discountResult;
    }
    return 0;
  }
}

export default Discount;
