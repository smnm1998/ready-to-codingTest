import InputView from './views/InputView.js';
import OutputView from './views/OutputView.js';
import InputParser from './models/InputParser.js';
import Validator from './models/Validator.js';
import Discount from './models/Discount.js';

class App {
  async run() {
    const inputView = new InputView();
    const outputView = new OutputView();
    const validator = new Validator();
    const inputParser = new InputParser();
    const discount = new Discount();

    outputView.printIntro();
    const selectMovie = await this.getSelectMoive(
      inputView,
      outputView,
      validator,
      inputParser,
    );
    const movieInfo = inputParser.parsedMovieInfo(selectMovie);
    outputView.printMovieInfo(movieInfo);

    const movieStartTimeAndPrice = inputParser.parsedAdvanceTicket(selectMovie);
    const discountMorningMovie = discount.discountMatinee(selectMovie);

    outputView.printSpace();
    const selectSeat = await this.getSelectSeat(
      inputView,
      outputView,
      validator,
      movieInfo.seat,
    );

    outputView.printSpace();
    const membershipDiscount = await this.getMembershipDiscount(
      inputView,
      outputView,
      validator,
    );
    const membership = discount.discountMembership(membershipDiscount);
    const totalDiscount = membership + discountMorningMovie;
    const totalResult = movieStartTimeAndPrice.moviePrice - totalDiscount;

    outputView.printSpace();
    outputView.printAdvanceTicket(
      selectMovie,
      selectSeat,
      movieStartTimeAndPrice,
      discountMorningMovie,
      membership,
      totalResult,
    );
  }

  async getSelectMoive(inputView, outputView, validator, inputParser) {
    while (true) {
      try {
        const selectMovie = await inputView.readSelectMovie();
        const movieName = inputParser.parsedMovieName(selectMovie);
        validator.validateMovieName(movieName);

        return movieName;
      } catch (error) {
        outputView.print(error.message);
      }
    }
  }

  async getSelectSeat(inputView, outputView, validator, seatObj) {
    while (true) {
      try {
        const selectSeat = await inputView.readSelectSeat();
        validator.validateSeatNum(selectSeat, seatObj);

        return selectSeat;
      } catch (error) {
        outputView.print(error.message);
      }
    }
  }

  async getMembershipDiscount(inputView, outputView, validator) {
    while (true) {
      try {
        const membership = await inputView.readMembership();
        validator.validateMembership(membership);

        return membership;
      } catch (error) {
        outputView.print(error.message);
      }
    }
  }
}

export default App;
