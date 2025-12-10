import App from '../src/App.js';
import { Console } from '@woowacourse/mission-utils';

const mockQuestions = (inputs) => {
  Console.readLineAsync = jest.fn();
  Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();
    return Promise.resolve(input);
  });
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(Console, 'print');
  logSpy.mockClear();
  return logSpy;
};

describe('12월 이벤트 플래너 - 기능 통합 테스트', () => {
  // --- 시나리오 1: 복합 할인 (디데이 + 평일 + 특별) ---
  test('12월 3일: 크리스마스 디데이, 평일, 특별 할인이 모두 적용된 상세 내역을 출력한다', async () => {
    // 12월 3일(일): 평일 할인(디저트), 특별 할인(★), 디데이 할인 적용
    // 주문: 초코케이크-3 (45,000원)
    // 혜택 예상:
    // 1. 디데이: 1,000 + (3-1)*100 = -1,200원
    // 2. 평일(디저트 3개): 2,024 * 3 = -6,072원
    // 3. 특별: -1,000원
    // 총혜택: -8,272원

    const inputs = ['3', '초코케이크-3'];
    mockQuestions(inputs);
    const logSpy = getLogSpy();

    const app = new App();
    await app.run();

    const logs = logSpy.mock.calls.map(([message]) => message).join('\n');

    expect(logs).toContain('크리스마스 디데이 할인: -1,200원');
    expect(logs).toContain('평일 할인: -6,072원');
    expect(logs).toContain('특별 할인: -1,000원');
    expect(logs).toContain('-8,272원'); // 총혜택 금액
    expect(logs).toContain('별'); // 5,000원 이상 10,000원 미만 배지
  });

  // --- 시나리오 2: 주말 할인 ---
  test('12월 2일: 주말 할인이 적용된 상세 내역을 출력한다', async () => {
    // 12월 2일(토): 주말 할인(메인)
    // 주문: 티본스테이크-2 (110,000원)
    // 혜택 예상:
    // 1. 디데이: 1,000 + (2-1)*100 = -1,100원
    // 2. 주말(메인 2개): 2,024 * 2 = -4,048원
    // 총혜택: -5,148원

    const inputs = ['2', '티본스테이크-2'];
    mockQuestions(inputs);
    const logSpy = getLogSpy();

    const app = new App();
    await app.run();

    const logs = logSpy.mock.calls.map(([message]) => message).join('\n');

    expect(logs).toContain('크리스마스 디데이 할인: -1,100원');
    expect(logs).toContain('주말 할인: -4,048원');
    expect(logs).toContain('-5,148원');
    expect(logs).toContain('별');
  });

  // --- 시나리오 3: 산타 배지 및 증정 이벤트 ---
  test('12월 24일: 증정 이벤트와 산타 배지가 적용된 결과를 출력한다', async () => {
    // 12월 24일(일): 평일(디저트), 특별(★), 증정(12만원↑)
    // 주문: 티본스테이크-1, 바비큐립-1, 초코케이크-3, 아이스크림-5
    // 총주문: 55,000 + 54,000 + 45,000 + 25,000 = 179,000원
    // 혜택 예상:
    // 1. 디데이(24일): 1,000 + 23*100 = -3,300원
    // 2. 평일(디저트 8개): 2,024 * 8 = -16,192원
    // 3. 특별: -1,000원
    // 4. 증정: -25,000원 (샴페인)
    // 총혜택: -45,492원

    const inputs = [
      '24',
      '티본스테이크-1,바비큐립-1,초코케이크-3,아이스크림-5',
    ];
    mockQuestions(inputs);
    const logSpy = getLogSpy();

    const app = new App();
    await app.run();

    const logs = logSpy.mock.calls.map(([message]) => message).join('\n');

    expect(logs).toContain('<증정 메뉴>\n샴페인 1개');
    expect(logs).toContain('증정 이벤트: -25,000원');
    expect(logs).toContain('-45,492원');
    expect(logs).toContain('<12월 이벤트 배지>\n산타');
  });

  // --- 시나리오 4: 혜택 미적용 (12,000원 미만) ---
  test('총주문 금액 12,000원 미만일 경우 혜택이 없음을 출력한다', async () => {
    // 12월 25일(월): 이벤트 기간이지만 금액 미달
    // 주문: 양송이수프-1 (6,000원)

    const inputs = ['25', '양송이수프-1'];
    mockQuestions(inputs);
    const logSpy = getLogSpy();

    const app = new App();
    await app.run();

    const logs = logSpy.mock.calls.map(([message]) => message).join('\n');

    expect(logs).not.toContain('크리스마스 디데이 할인: -3,400원'); // 이 로그가 없어야 함
    // 실제로는 "혜택 내역" 밑에 "없음"이 나오는지 확인하거나,
    // 총혜택 금액이 "0원"인지 확인
    expect(logs).toContain('<혜택 내역>\n없음');
    expect(logs).toContain('<총혜택 금액>\n0원');
    expect(logs).toContain('<12월 이벤트 배지>\n없음');
  });

  // --- 시나리오 5: 예외 처리 (재입력 검증) ---
  test('주문 수량 20개 초과 및 음료만 주문 시 에러 문구를 출력하고 재입력을 받는다', async () => {
    const inputs = [
      '3',
      '티본스테이크-21', // 예외 1: 20개 초과
      '제로콜라-1,레드와인-1', // 예외 2: 음료만 주문
      '티본스테이크-1,제로콜라-1', // 정상 입력
    ];
    mockQuestions(inputs);
    const logSpy = getLogSpy();

    const app = new App();
    await app.run();

    const logs = logSpy.mock.calls.map(([message]) => message).join('\n');

    // 에러 메시지가 2번 출력되었는지 확인
    // (정확한 횟수보다는 에러 로그 존재 여부와 최종 정상 출력을 확인)
    expect(logs).toContain('[ERROR]');
    expect(logs).toContain('티본스테이크 1개');
    expect(logs).toContain('제로콜라 1개');
  });
});
