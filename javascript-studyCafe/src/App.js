import { ROOMS } from './constants/Data.js';
import InputView from './views/InputView.js';
import InputParser from './models/InputParser.js';
import Validator from './models/Validator.js';
import Calculator from './models/Calculator.js';
import OutputView from './views/OutputView.js';
import Discount from './models/Discount.js';

class App {
  async run() {
    const inputView = new InputView();
    const inputParser = new InputParser();
    const validator = new Validator();
    const calculator = new Calculator();
    const discount = new Discount();
    const outputView = new OutputView();

    outputView.printIntro();
    const reservationDate = await this.getReservationDate(
      inputView,
      inputParser,
      validator,
      outputView,
    );

    outputView.printSpace();
    const reservationRoom = await this.getReservationRoom(
      inputView,
      inputParser,
      validator,
      outputView,
    );
    const outputRoomUsersMax = this.#outputUsersMax(reservationRoom);

    outputView.printSpace();
    const reservationTime = await this.getReservationTime(
      inputView,
      inputParser,
      validator,
      outputView,
      reservationDate.day,
    );
    const runningTime = calculator.calculateRunningTime(reservationTime);
    const calculateResult = calculator.calculateTotalPrice(
      reservationTime,
      reservationRoom,
    );
    const weekendCharge = calculator.calculateWeekendCharge(
      calculateResult,
      reservationDate.day,
    );
    const nightCharge = calculator.calculateNightCharge(
      reservationTime,
      reservationRoom,
    );
    const chargeAddAmount = calculator.calculateChargeAddAmount(
      calculateResult,
      weekendCharge,
      nightCharge.charge,
    );
    const discountHours = discount.discountLongUse(
      runningTime,
      chargeAddAmount,
    );

    outputView.printSpace();
    const reservationNumberOfUsers = await this.getReservationUsers(
      inputView,
      inputParser,
      validator,
      outputView,
      reservationRoom,
      outputRoomUsersMax,
    );

    outputView.printSpace();
    const finalPaymentAmount = calculator.calculateFinalPaymentAmount(
      calculateResult,
      weekendCharge,
      nightCharge,
      discountHours,
    );

    const reservation = {
      date: reservationDate,
      room: reservationRoom,
      roomMaxUsers: outputRoomUsersMax,
      time: reservationTime,
      runningTime,
      numberOfUsers: reservationNumberOfUsers,
    };

    const payment = {
      baseAmount: calculateResult,
      weekendCharge,
      nightCharge,
      discount: discountHours,
      finalAmount: finalPaymentAmount,
    };

    outputView.printConfirmation(reservation, payment);
  }

  async getReservationDate(inputView, inputParser, validator, outputView) {
    while (true) {
      try {
        const reservationDate = await inputView.readReservationDate();
        const parsedDate = inputParser.parsedReservationDate(reservationDate);
        validator.validateDate(parsedDate);

        return parsedDate;
      } catch (error) {
        outputView.print(error.message);
      }
    }
  }

  async getReservationRoom(inputView, inputParser, validator, outputView) {
    while (true) {
      try {
        const reservationRoom = await inputView.readReservationRoom();
        const parsedRoom = inputParser.parsedReservationRoom(reservationRoom);
        validator.validateRoom(parsedRoom);

        return parsedRoom;
      } catch (error) {
        outputView.print(error.message);
      }
    }
  }

  async getReservationTime(inputView, inputParser, validator, outputView, day) {
    while (true) {
      try {
        const reservationTime = await inputView.readHoursOfUse();
        const parsedTime = inputParser.parsedReservationTime(reservationTime);
        validator.validateTime(parsedTime, day);

        return parsedTime;
      } catch (error) {
        outputView.print(error.message);
      }
    }
  }

  async getReservationUsers(
    inputView,
    inputParser,
    validator,
    outputView,
    reservationRoom,
  ) {
    while (true) {
      try {
        const reservationUsers = await inputView.readNumberOfUsers();
        const parsedNumberOfUsers =
          inputParser.parsedReservationUsers(reservationUsers);
        validator.validateNumberOfUsers(parsedNumberOfUsers, reservationRoom);

        return parsedNumberOfUsers;
      } catch (error) {
        outputView.print(error.message);
      }
    }
  }

  #outputUsersMax(reservationRoom) {
    const rooms = Object.values(ROOMS).find(
      (chk) => chk.name === reservationRoom,
    );
    return rooms.max;
  }
}

export default App;
