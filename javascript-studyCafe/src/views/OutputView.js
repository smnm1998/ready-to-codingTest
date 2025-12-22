import { Console } from '@woowacourse/mission-utils';
import { DAY_OF_THE_WEEK } from '../constants/Data.js';

class OutputView {
  print(message) {
    Console.print(message);
  }

  printSpace() {
    Console.print('');
  }

  printIntro() {
    Console.print('안녕하세요! 우아한 스터디 카페입니다.');
  }

  printConfirmation(reservation, payment) {
    Console.print('');
    Console.print('==============================');
    Console.print('<예약 확인>');
    Console.print(
      `날짜: ${reservation.date.original} (${DAY_OF_THE_WEEK[reservation.date.day]}요일)`,
    );
    Console.print(`방: ${reservation.room} (${reservation.roomMaxUsers}인실)`);
    Console.print(
      `시간: ${reservation.time.original} (${reservation.runningTime}시간)`,
    );
    Console.print(`인원: ${reservation.numberOfUsers}명`);
    Console.print('');
    Console.print('<결제 내역>');
    Console.print(`기본 요금: ${payment.baseAmount.toLocaleString()}원`);
    Console.print(
      `주말 할증(+10%): +${payment.weekendCharge.toLocaleString()}원`,
    );
    Console.print(
      `야간 할증(${payment.nightCharge.hours}시간): +${payment.nightCharge.charge.toLocaleString()}원`,
    );
    Console.print(`장시간 할인(-5%): -${payment.discount.toLocaleString()}원`);
    Console.print('');
    Console.print(`최종 결제 금액: ${payment.finalAmount.toLocaleString()}원`);
    Console.print('==============================');
  }
}

export default OutputView;
