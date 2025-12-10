import { Console } from '@woowacourse/mission-utils';

class OutputView {
  print(message) {
    Console.print(message);
  }

  printPromotion() {
    Console.print('안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.\n');
  }

  printPromotionIntroduce() {
    Console.print('<프로모션 이벤트 안내>');
    Console.print('------------------------------------');
  }

  printPromotionPreview(
    date,
    orderItems,
    totalCalculate,
    giftAmount,
    benefits,
    totalDiscount,
    totalResult,
    eventBadge,
  ) {
    Console.print('');
    Console.print(
      `12월 ${date}일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!\n`,
    );
    Console.print('<주문 메뉴>');
    for (let order of orderItems) {
      Console.print(`${order.name} ${order.count}개`);
    }
    Console.print('');
    Console.print('<할인 전 총주문 금액>');
    Console.print(`${totalCalculate.toLocaleString()}원\n`);
    Console.print('<증정 메뉴>');

    const giftText = giftAmount >= 25000 ? '샴페인 1개' : '없음';
    Console.print(giftText);
    Console.print('');
    Console.print('<혜택 내역>');

    let hasBenefit = false;
    if (benefits.christmas > 0) {
      Console.print(
        `크리스마스 디데이 할인: -${benefits.christmas.toLocaleString()}원`,
      );
      hasBenefit = true;
    }
    if (benefits.weekday > 0) {
      Console.print(`평일 할인: -${benefits.weekday.toLocaleString()}원`);
      hasBenefit = true;
    }
    if (benefits.weekend > 0) {
      Console.print(`주말 할인: -${benefits.weekend.toLocaleString()}원`);
      hasBenefit = true;
    }
    if (benefits.special > 0) {
      Console.print(`특별 할인: -${benefits.special.toLocaleString()}원`);
      hasBenefit = true;
    }
    if (benefits.gift > 0) {
      Console.print(`증정 이벤트: -${benefits.gift.toLocaleString()}원`);
      hasBenefit = true;
    }

    if (!hasBenefit) {
      Console.print('없음');
    }

    Console.print('');
    Console.print('<총혜택 금액>');
    Console.print(
      totalDiscount === 0 ? '0원' : `-${totalDiscount.toLocaleString()}원`,
    );

    Console.print('');
    Console.print('<할인 후 예상 금액>');
    Console.print(`${totalResult.toLocaleString()}원`);

    Console.print('');
    Console.print('<12월 이벤트 배지>');

    if (totalDiscount >= 20000) {
      Console.print(eventBadge.SANTA.name);
    }

    if (totalDiscount >= 10000 && totalDiscount < 20000) {
      Console.print(eventBadge.TREE.name);
    }

    if (totalDiscount >= 5000 && totalDiscount < 10000) {
      Console.print(eventBadge.STAR.name);
    }

    if (totalDiscount >= 0 && totalDiscount < 5000) {
      Console.print('없음');
    }
  }
}

export default OutputView;
