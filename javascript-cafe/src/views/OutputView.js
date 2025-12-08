import { Console } from '@woowacourse/mission-utils';

class OutputView {
  print(message) {
    Console.print(message);
  }

  printReceipt(
    items,
    total,
    placeDiscount,
    dessertDiscount,
    membershipDiscount,
    finallyTotal,
  ) {
    Console.print('[주문 내역]');
    for (let item of items) {
      Console.print(`${item.name} ${item.count}개`);
    }
    Console.print('');
    Console.print('[할인 전 총금액]');
    Console.print(`${total.toLocaleString()}원\n`);
    Console.print('[할인 내역]');
    Console.print(`포장 할인: -${placeDiscount.toLocaleString()}원`);
    Console.print(`디저트 할인: -${dessertDiscount.toLocaleString()}원`);
    Console.print(`통신사 할인: -${membershipDiscount.toLocaleString()}원\n`);
    Console.print('[최종 결제 금액]');
    Console.print(`${finallyTotal.toLocaleString()}원`);
  }
}

export default OutputView;
