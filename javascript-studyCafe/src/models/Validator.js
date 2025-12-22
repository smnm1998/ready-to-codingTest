import { TODAY_DATE, ROOMS } from '../constants/Data.js';

class Validator {
  constructor() {
    this.validRooms = [
      ROOMS.LAVENDER.name,
      ROOMS.SAGE.name,
      ROOMS.PEPPERMINT.name,
    ];
  }

  validateDate({ original, date }) {
    if (isNaN(date.getTime())) throw new Error('[ERROR] 잘못된 형식입니다.');

    const [y, m, d] = original.split('-').map(Number);
    if (
      date.getFullYear() !== y ||
      date.getMonth() + 1 !== m ||
      date.getDate() !== d
    ) {
      throw new Error('[ERROR] 유효하지 않은 날짜입니다.');
    }

    if (date < TODAY_DATE)
      throw new Error(
        '[ERROR] 2024년 6월 1일 이전 날짜에는 예약을 할 수 없습니다.',
      );
  }

  validateRoom(parsedRoom) {
    if (!parsedRoom || parsedRoom === '') {
      throw new Error('[ERROR] 잘못된 형식입니다.');
    }

    if (!this.validRooms.includes(parsedRoom)) {
      throw new Error('[ERROR] 존재하지 않는 스터디 룸입니다.');
    }
  }

  validateTime({ start, end }, day) {
    // 시작 시각보다 끝난 시각이 더 이른 경우 체크
    if (start > end) {
      throw new Error(
        '[ERROR] 시작 시간이 끝난 시간보다 더 늦을 수는 없습니다.',
      );
    }

    const isWeekday = day >= 1 && day <= 5;
    const isWeekend = day === 0 || day === 6;

    // 평일 시간 체크
    if (isWeekday && (start < 600 || end > 1320)) {
      throw new Error('[ERROR] 평일 영업 시간은 10시부터 22시까지 입니다.');
    }

    // 주말 시간 체크
    if (isWeekend && (start < 600 || end > 1440)) {
      throw new Error('[ERROR] 주말 영업 시간은 10시부터 24시까지 입니다.');
    }
  }

  validateNumberOfUsers(parsedNumberOfUsers, reservationRoom) {
    if (parsedNumberOfUsers < 1 || isNaN(parsedNumberOfUsers)) {
      throw new Error('[ERROR] 잘못된 형식입니다.');
    }

    const rooms = Object.values(ROOMS).find(
      (chk) => chk.name === reservationRoom,
    );

    if (parsedNumberOfUsers > rooms.max) {
      throw new Error(
        `[ERROR] ${reservationRoom}는 ${rooms.max}인실입니다. 다시 입력해 주세요.`,
      );
    }
  }
}

export default Validator;
