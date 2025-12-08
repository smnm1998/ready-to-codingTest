class Discount {
  // 음료 별로 500원 할인
  calculatePlaceDiscount(place, beverageCount) {
    if (place === '포장') {
      return 500 * beverageCount;
    }
    return 0;
  }

  // 음료+디저트 함께 구매 시 디저트 할인
  calculateDessertDiscount(beverageCount, dessertCount) {
    return Math.min(beverageCount, dessertCount) * 1000;
  }

  // 멤버쉽 할인
  calculateMembershipDiscount(total, membership) {
    if (membership === 'Y') {
      return Math.min(total * 0.05, 2000);
    }
    return 0;
  }
}

export default Discount;
