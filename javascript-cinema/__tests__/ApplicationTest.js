import App from '../src/App.js';
import { MissionUtils } from '@woowacourse/mission-utils';

const mockQuestions = (inputs) => {
  MissionUtils.Console.readLineAsync = jest.fn();
  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();
    return Promise.resolve(input);
  });
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, 'print');
  logSpy.mockClear();
  return logSpy;
};

describe('우아한 시네마 테스트', () => {
  test('기능 테스트 - 조조 할인 및 멤버십 할인 적용', async () => {
    // given
    const logSpy = getLogSpy();
    // 아바타 2(15000원) -> 조조(-2000) -> 멤버십 20%(-3000) = 10000원
    const inputs = ['아바타 2', 'A3', 'Y'];
    mockQuestions(inputs);

    // when
    const app = new App();
    await app.run();

    // then
    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining('최종 결제 금액: 10,000원'),
    );
    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining('조조 할인: -2,000원'),
    );
    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining('멤버십 할인: -3,000원'),
    );
  });

  test('기능 테스트 - 할인 미적용 및 좌석 현황 확인', async () => {
    // given
    const logSpy = getLogSpy();
    // 서울의 봄(14000원) -> 조조X -> 멤버십X = 14000원
    const inputs = ['서울의 봄', 'B5', 'N'];
    mockQuestions(inputs);

    // when
    const app = new App();
    await app.run();

    // then
    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining('최종 결제 금액: 14,000원'),
    );
    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining('B | O O O O O'),
    ); // 빈 좌석 확인
  });

  test('예외 테스트 - 이미 예매된 좌석 선택', async () => {
    // given
    const logSpy = getLogSpy();
    // 아바타 2의 A1은 이미 예매됨 -> 에러 후 A3 선택
    const inputs = ['아바타 2', 'A1', 'A3', 'N'];
    mockQuestions(inputs);

    // when
    const app = new App();
    await app.run();

    // then
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('[ERROR]'));
  });

  test('예외 테스트 - 존재하지 않는 영화 선택', async () => {
    // given
    const logSpy = getLogSpy();
    const inputs = ['없는 영화', '아바타 2', 'A3', 'N'];
    mockQuestions(inputs);

    // when
    const app = new App();
    await app.run();

    // then
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('[ERROR]'));
  });
});
