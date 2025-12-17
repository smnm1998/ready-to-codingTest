import { MOVIE } from '../constants/Movie.js';
import { DEFAULT, AVATAR_SEAT, NORYANG_SEAT } from '../constants/Seat.js';

class InputParser {
  parsedMovieName(selectMovie) {
    const trimmed = selectMovie.trim();
    return trimmed;
  }

  // 영화 정보 출력 (정보 헤더 ,좌석 정보)
  parsedMovieInfo(selectMovie) {
    let newStartTime = '';

    if (selectMovie === MOVIE.AVATAR.name) {
      newStartTime = MOVIE.AVATAR.startTime;
      const header = `[${selectMovie}] ${newStartTime} 상영`;
      return { header, seat: AVATAR_SEAT };
    }

    if (selectMovie === MOVIE.SPRINGSEOUL.name) {
      newStartTime = MOVIE.SPRINGSEOUL.startTime;
      const header = `[${selectMovie}] ${newStartTime} 상영`;
      return { header, seat: DEFAULT };
    }

    if (selectMovie === MOVIE.NORYANG.name) {
      newStartTime = MOVIE.NORYANG.startTime;
      const header = `[${selectMovie}] ${newStartTime} 상영`;
      return { header, seat: NORYANG_SEAT };
    }
  }

  parsedSeatSelect(selectSeat) {
    const splitted = selectSeat.split('');
    const row = splitted[0];
    const colNumber = splitted[1];
    const columnIndex = colNumber - 1;
    return { row, columnIndex };
  }

  parsedMovieAndSeat(selectMovie, selectSeat) {
    const { row, columnIndex } = this.parsedSeatSelect(selectSeat);

    if (selectMovie === MOVIE.AVATAR.name) {
      AVATAR_SEAT[row][columnIndex] = 'X';
    }
    if (selectMovie === MOVIE.SPRINGSEOUL.name) {
      DEFAULT[row][columnIndex] = 'X';
    }
    if (selectMovie === MOVIE.NORYANG.name) {
      NORYANG_SEAT[row][columnIndex] = 'X';
    }
  }

  // 상영시간, 정가 추출해야함.
  parsedAdvanceTicket(selectMovie) {
    let movieStartTime = '';
    let moviePrice = 0;

    if (selectMovie === MOVIE.AVATAR.name) {
      movieStartTime = MOVIE.AVATAR.startTime;
      moviePrice += MOVIE.AVATAR.price;
      return { movieStartTime, moviePrice };
    }

    if (selectMovie === MOVIE.SPRINGSEOUL.name) {
      movieStartTime = MOVIE.SPRINGSEOUL.startTime;
      moviePrice += MOVIE.SPRINGSEOUL.price;
      return { movieStartTime, moviePrice };
    }

    if (selectMovie === MOVIE.NORYANG.name) {
      movieStartTime = MOVIE.NORYANG.startTime;
      moviePrice += MOVIE.NORYANG.price;
      return { movieStartTime, moviePrice };
    }
  }
}

export default InputParser;
