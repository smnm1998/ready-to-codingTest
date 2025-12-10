import InputView from './views/InputView.js';
import OutputView from './views/OutputView.js';
import Validator from './models/Validator.js';
import InputParser from './models/InputParser.js';
import Discount from './models/Discount.js';

class App {
  async run() {
    const inputView = new InputView();
    const outputView = new OutputView();
    const validator = new Validator();
    const inputParser = new InputParser();
    const discount = new Discount();

    outputView.printPromotion();

    const visitDate = await this.getVisitDate(inputView, outputView, validator);

    outputView.printPromotionIntroduce();

    const menuAndCount = await this.getMenuAndCount(
      inputView,
      outputView,
      validator,
      inputParser,
    );
    const parsedMenuAndCount = inputParser.parsedOrder(menuAndCount);
    const totalCalculate = inputParser.calculateTotal(parsedMenuAndCount);

    // 개수
    const dessertsCount = inputParser.countDesserts(parsedMenuAndCount);
    const mainDishCount = inputParser.countMainDish(parsedMenuAndCount);

    // 할인: 12,000원 미만이면 모든 혜택 0원
    let christmasAmount = 0;
    let weekdayAmont = 0;
    let weekendAmount = 0;
    let specialAmount = 0;
    let giftAmount = 0;

    if (totalCalculate >= 12000) {
      christmasAmount = discount.christmasDiscount(visitDate);
      weekdayAmont = discount.weekdayDiscount(visitDate, dessertsCount);
      weekendAmount = discount.weekendDiscount(visitDate, mainDishCount);
      specialAmount = discount.specialDiscount(visitDate);
      giftAmount = discount.giftGiving(totalCalculate);
    }

    const benefits = {
      christmas: christmasAmount,
      weekday: weekdayAmont,
      weekend: weekendAmount,
      special: specialAmount,
      gift: giftAmount,
    };

    const totalDiscount = inputParser.calculateTotalDiscount(benefits);
    const totalResult = inputParser.calculateResult(totalCalculate, benefits);

    const eventBadge = {
      SANTA: { name: '산타', totalLimit: 20000 },
      TREE: { name: '트리', totalLimit: 10000 },
      STAR: { name: '별', totalLimit: 5000 },
    };

    outputView.printPromotionPreview(
      visitDate,
      parsedMenuAndCount,
      totalCalculate,
      giftAmount,
      benefits,
      totalDiscount,
      totalResult,
      eventBadge,
    );
  }

  async getVisitDate(inputView, outputView, validator) {
    while (true) {
      try {
        const date = await inputView.inputVisitDate();
        const numericDate = Number(date);
        validator.validateVisitDateLimit(numericDate);
        return numericDate;
      } catch (error) {
        outputView.print(error.message);
      }
    }
  }

  async getMenuAndCount(inputView, outputView, validator, inputParser) {
    while (true) {
      try {
        const orderString = await inputView.inputMenuAndCount();

        const parsed = inputParser.parsedOrder(orderString);
        validator.validateOrderFormat(orderString);
        validator.validateNotInMenu(parsed);
        validator.validateDuplicateMenu(parsed);
        validator.validateTotalCount(parsed);
        validator.validateCountMinimum(parsed);
        validator.validateNotOnlyDrinks(parsed);

        return orderString;
      } catch (error) {
        outputView.print(error.message);
      }
    }
  }
}

export default App;
