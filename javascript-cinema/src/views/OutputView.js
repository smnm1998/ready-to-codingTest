import { Console } from '@woowacourse/mission-utils';
import { MOVIE } from '../constants/Movie.js';

class OutputView {
  print(message) {
    Console.print(message);
  }

  printSpace() {
    Console.print('');
  }

  printIntro() {
    Console.print('안녕하세요! 우아한 시네마입니다!');
    Console.print('상영 영화 목록입니다.');
    Console.print(
      `- ${MOVIE.AVATAR.name} (${MOVIE.AVATAR.runningTime}분) : ${MOVIE.AVATAR.price.toLocaleString()}원`,
    );
    Console.print(
      `- ${MOVIE.SPRINGSEOUL.name} (${MOVIE.SPRINGSEOUL.runningTime}분) : ${MOVIE.SPRINGSEOUL.price.toLocaleString()}원`,
    );
    Console.print(
      `- ${MOVIE.NORYANG.name} (${MOVIE.NORYANG.runningTime}분) : ${MOVIE.NORYANG.price.toLocaleString()}원`,
    );
    Console.print('');
  }

  printMovieInfo(movieInfo) {
    Console.print('');
    Console.print(movieInfo.header);
    for (const [row, seats] of Object.entries(movieInfo.seat)) {
      Console.print(`${row} | ${seats.join(' ')}`);
    }
  }

  printAdvanceTicket(
    selectMovie,
    selectSeat,
    movieStartTimeAndPrice,
    discountMorningMovie,
    membership,
    totalResult,
  ) {
    Console.print('==============================');
    Console.print('<예매 내역>');
    Console.print(`영화: ${selectMovie}`);
    Console.print(`상영 시간: ${movieStartTimeAndPrice.movieStartTime}`);
    Console.print(`좌석: ${selectSeat}`);
    Console.print('');
    Console.print('<결제 내역>');
    Console.print(
      `정가: ${movieStartTimeAndPrice.moviePrice.toLocaleString()}원`,
    );
    Console.print(`조조 할인: -${discountMorningMovie.toLocaleString()}원`);
    Console.print(`멤버십 할인: -${membership.toLocaleString()}원`);
    Console.print('');
    Console.print(`최종 결제 금액: ${totalResult.toLocaleString()}원`);
    Console.print('==============================');
    Console.print('감사합니다. 즐거운 관람 되세요!');
  }
}

export default OutputView;
