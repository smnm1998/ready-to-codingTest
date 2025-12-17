import { MOVIE } from '../constants/Movie.js';

class Validator {
  validateMovieName(selectMovie) {
    if (
      selectMovie !== MOVIE.AVATAR.name &&
      selectMovie !== MOVIE.SPRINGSEOUL.name &&
      selectMovie !== MOVIE.NORYANG.name
    ) {
      throw new Error('[ERROR] 상영 중인 영화에 없는 영화입니다.');
    }
  }

  validateSeatNum(selectSeat, seatObj) {
    const row = selectSeat[0];
    const columnIndex = Number(selectSeat[1]) - 1;

    if (
      (row !== 'A' && row !== 'B' && row !== 'C') ||
      columnIndex < 0 ||
      columnIndex > 4
    ) {
      throw new Error('[ERROR] 존재하지 않는 좌석입니다.');
    }

    // 좌석 예매가 되어있는 거면 에러
    if (seatObj[row][columnIndex] === 'X') {
      throw new Error('[ERROR] 이미 예약된 좌석입니다.');
    }
  }

  validateMembership(membership) {
    if (membership !== 'Y' && membership !== 'N') {
      throw new Error('[ERROR] Y 또는 N으로만 입력해 주세요.');
    }
  }
}

export default Validator;
