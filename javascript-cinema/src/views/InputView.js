import { Console } from '@woowacourse/mission-utils';

class InputView {
  async readSelectMovie() {
    return await Console.readLineAsync('예매할 영화 제목을 입력해 주세요.\n');
  }

  async readSelectSeat() {
    return await Console.readLineAsync(
      '예매할 좌석을 선택해 주세요. (예: A1)\n',
    );
  }

  async readMembership() {
    return await Console.readLineAsync('멤버십 할인을 받으시겠습니까? (Y/N)\n');
  }
}

export default InputView;
