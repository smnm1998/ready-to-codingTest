import { Console } from '@woowacourse/mission-utils';

class InputView {
  async readPlace() {
    return await Console.readLineAsync(
      '식사 장소를 선택해 주세요. (매장/포장)\n',
    );
  }

  async readOrder() {
    return await Console.readLineAsync(
      '\n주문하실 메뉴와 수량을 입력해 주세요. (예: 아메리카노-2,초코케이크-1)\n',
    );
  }

  async readMembership() {
    return await Console.readLineAsync(
      '\n통신사 제휴 할인을 적용하시겠습니까? (Y/N)\n',
    );
  }
}

export default InputView;
