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

describe('우아한 카페 키오스크 테스트', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test('기능 테스트: 포장 및 디저트 할인 적용', async () => {
    // given
    const logSpy = getLogSpy();
    mockQuestions(['포장', '아메리카노-2,초코케이크-1', 'N']);

    // when
    const app = new App();
    await app.run();

    // then
    const expectedLogs = [
      '[주문 내역]',
      '아메리카노 2개',
      '초코케이크 1개',
      '[할인 전 총금액]',
      '15,500원',
      '[할인 내역]',
      '포장 할인: -1,000원', // 음료 2잔 * 500원
      '디저트 할인: -1,000원', // 음료 2잔, 디저트 1개 -> 1개 적용
      '[최종 결제 금액]',
      '13,500원',
    ];

    expectedLogs.forEach((log) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(log));
    });
  });

  test('기능 테스트: 통신사 할인 한도 적용 (최대 2,000원)', async () => {
    // given
    const logSpy = getLogSpy();
    // 총액 45,000원 -> 5%는 2,250원이지만 한도 2,000원 적용 확인
    mockQuestions(['매장', '아메리카노-10', 'Y']);

    // when
    const app = new App();
    await app.run();

    // then
    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining('통신사 할인: -2,000원'),
    );
  });

  test('예외 테스트: 존재하지 않는 메뉴 입력', async () => {
    // given
    const logSpy = getLogSpy();
    mockQuestions(['매장', '바닐라라떼-1', '아메리카노-1', 'N']);

    // when
    const app = new App();
    await app.run();

    // then
    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining(
        '[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.',
      ),
    );
  });

  test('예외 테스트: 형식이 다른 주문 입력', async () => {
    // given
    const logSpy = getLogSpy();
    mockQuestions(['매장', '아메리카노:1', '아메리카노-1', 'N']);

    // when
    const app = new App();
    await app.run();

    // then
    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining(
        '[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.',
      ),
    );
  });

  test('예외 테스트: 중복 메뉴 입력', async () => {
    // given
    const logSpy = getLogSpy();
    mockQuestions(['매장', '아메리카노-1,아메리카노-2', '아메리카노-3', 'N']);

    // when
    const app = new App();
    await app.run();

    // then
    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining(
        '[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.',
      ),
    );
  });
});
