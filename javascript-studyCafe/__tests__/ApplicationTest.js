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

describe('우아한 스터디 카페 테스트', () => {
  test('기능 테스트 - 주말 + 야간 + 장시간 복합 적용', async () => {
    // given
    // 날짜: 2024-06-15 (토) -> 주말 할증 대상
    // 룸: 페퍼민트(12,000원)
    // 시간: 20:00-24:00 (4시간) -> 야간 할증 대상(전체), 장시간 할인 대상

    // 계산 로직:
    // 1. 기본: 12,000 * 4 = 48,000
    // 2. 주말 할증(10%): 48,000 * 0.1 = 4,800
    // 3. 야간 할증(20시~24시, 4시간): (12,000 * 0.1) * 4 = 4,800
    //    중간 합계: 48,000 + 4,800 + 4,800 = 57,600
    // 4. 장시간 할인(5%): 57,600 * 0.05 = 2,880
    // 5. 최종: 57,600 - 2,880 = 54,720

    const logSpy = getLogSpy();
    const inputs = ['2024-06-15', '페퍼민트', '20:00-24:00', '5'];
    mockQuestions(inputs);

    // when
    const app = new App();
    await app.run();

    // then
    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining('최종 결제 금액: 54,720원'),
    );
    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining('주말 할증(+10%): +4,800원'),
    );
    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining('야간 할증(4시간): +4,800원'),
    );
  });

  test('예외 테스트 - 기존 예약과 시간 중복 (페퍼민트 14:00~17:00)', async () => {
    // given
    const logSpy = getLogSpy();
    // 16:00~18:00은 기존 예약(14~17)과 16~17 구간이 겹침 -> 에러
    // 에러 후 정상 입력(18:00~20:00)
    const inputs = [
      '2024-06-15',
      '페퍼민트',
      '16:00-18:00',
      '18:00-20:00',
      '5',
    ];
    mockQuestions(inputs);

    // when
    const app = new App();
    await app.run();

    // then
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('[ERROR]'));
    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining('최종 결제 금액'),
    );
  });

  test('예외 테스트 - 운영 시간 초과 (평일 22시 마감)', async () => {
    // given
    const logSpy = getLogSpy();
    // 2024-06-17(월)은 평일이므로 22시 마감 -> 21:00-23:00 입력 시 에러
    const inputs = ['2024-06-17', '라벤더', '21:00-23:00', '20:00-22:00', '2'];
    mockQuestions(inputs);

    // when
    const app = new App();
    await app.run();

    // then
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('[ERROR]'));
  });

  test('예외 테스트 - 날짜 형식 오류', async () => {
    const logSpy = getLogSpy();
    const inputs = ['2024/06/15', '2024-06-15', '페퍼민트', '20:00-22:00', '4'];
    mockQuestions(inputs);

    const app = new App();
    await app.run();

    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('[ERROR]'));
  });
});
