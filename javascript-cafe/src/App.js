import InputView from './views/InputView.js';
import OutputView from './views/OutputView.js';
import Order from './models/Order.js';
import Discount from './models/Discount.js';
import Validator from './models/Validator.js';

// TODO: 금액이 커지면 NaN원으로 출력되는거 해결할 것
class App {
  async run() {
    const inputView = new InputView();
    const outputView = new OutputView();
    const order = new Order();
    const discount = new Discount();
    const validator = new Validator();

    // 입력
    const place = await inputView.readPlace();
    const { orderString, items } = await this.getOrderInput(
      inputView,
      outputView,
      order,
      validator,
    );

    const membership = await inputView.readMembership();
    validator.validateNoDuplicates(items);
    validator.validateMenuExists(items);
    validator.validateQuantity(items);

    const total = order.calculateTotal(items);
    const beverageCount = order.countBeverages(items);
    const dessertCount = order.countDessert(items);

    // 할인
    const placeDiscount = discount.calculatePlaceDiscount(place, beverageCount);
    const dessertDiscount = discount.calculateDessertDiscount(
      beverageCount,
      dessertCount,
    );
    const membershipDiscount = discount.calculateMembershipDiscount(
      total,
      membership,
    );

    // 최종 금액
    const finallyTotal =
      total - (placeDiscount + dessertDiscount + membershipDiscount);

    // 출력
    outputView.printReceipt(
      items,
      total,
      placeDiscount,
      dessertDiscount,
      membershipDiscount,
      finallyTotal,
    );
  }

  async getPlaceInput(inputView, outputView, validator) {
    while (true) {
      try {
        const place = await inputView.readPlace();
        validator.validatePlaceFormat(place);
        return place;
      } catch (error) {
        outputView.print(error.message);
      }
    }
  }

  async getOrderInput(inputView, outputView, order, validator) {
    while (true) {
      try {
        const orderString = await inputView.readOrder();
        validator.validateOrderFormat(orderString);

        const items = order.parseOrder(orderString);
        validator.validateNoDuplicates(items);
        validator.validateMenuExists(items);
        validator.validateQuantity(items);
        return { orderString, items };
      } catch (error) {
        outputView.print(error.message);
      }
    }
  }
}

export default App;
