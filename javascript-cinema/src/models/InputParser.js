import { MOVIE } from '../constants/Movie.js';
import { DEFAULT, AVATAR_SEAT, NORYANG_SEAT } from '../constants/Seat.js';

class InputParser {
  constructor() {
    this.movieMap = {
      [MOVIE.AVATAR.name]: MOVIE.AVATAR,
      [MOVIE.SPRINGSEOUL.name]: MOVIE.SPRINGSEOUL,
      [MOVIE.NORYANG.name]: MOVIE.NORYANG,
    };

    this.movieSeatMap = {
      [MOVIE.AVATAR.name]: AVATAR_SEAT,
      [MOVIE.SPRINGSEOUL.name]: DEFAULT,
      [MOVIE.NORYANG.name]: NORYANG_SEAT,
    };
  }

  parsedMovieName(selectMovie) {
    const trimmed = selectMovie.trim();
    return trimmed;
  }

  // 영화 정보 출력 (정보 헤더 ,좌석 정보)
  parsedMovieInfo(selectMovie) {
    const movie = this.#getMovieByName(selectMovie);
    const seat = this.movieSeatMap[selectMovie];
    const header = `[${selectMovie}] ${movie.startTime} 상영`;
    return { header, seat };
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
    const seat = this.movieSeatMap[selectMovie];
    seat[row][columnIndex] = 'X';
  }

  // 상영시간, 정가 추출해야함.
  parsedAdvanceTicket(selectMovie) {
    const movie = this.#getMovieByName(selectMovie);

    return {
      movieStartTime: movie.startTime,
      moviePrice: movie.price,
    };
  }

  #getMovieByName(movieName) {
    const movie = this.movieMap[movieName];
    if (!movie) throw new Error('[ERROR] 상영 중인 영화가 없는 영화입니다.');
    return movie;
  }
}

export default InputParser;
