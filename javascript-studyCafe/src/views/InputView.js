import { Console } from '@woowacourse/mission-utils';

class InputView {
  async readReservationDate() {
    return await Console.readLineAsync(
      '예약하실 날짜를 입력해 주세요. (YYYY-MM-DD)\n',
    );
  }

  async readReservationRoom() {
    return await Console.readLineAsync(
      '예약하실 스터디룸을 입력해 주세요. (라벤더, 세이지, 페퍼민트)\n',
    );
  }

  async readHoursOfUse() {
    return await Console.readLineAsync(
      '이용 시간을 입력해 주세요. (HH:MM-HH:MM)\n',
    );
  }

  async readNumberOfUsers() {
    return await Console.readLineAsync('사용 인원을 입력해 주세요.\n');
  }
}

export default InputView;
