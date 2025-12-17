import { MOVIE } from '../constants/Movie.js';

class Discount {
  // 오전 시간대면 (10:00 이전) 2000원 할인
  discountMatinee(selectMovie) {
    let discount = 0;
    if (selectMovie === MOVIE.AVATAR.name) {
      discount += 2000;
      return discount;
    }
    return 0;
  }
  // 멤버십할인 있으면 3000원 할인
  discountMembership(membershipDiscount) {
    let discount = 0;
    if (membershipDiscount === 'Y') {
      discount += 3000;
      return discount;
    }
    return 0;
  }
}

export default Discount;
