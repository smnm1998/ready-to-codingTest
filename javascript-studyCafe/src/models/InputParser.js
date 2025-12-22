class InputParser {
  parsedReservationDate(reservationDate) {
    return {
      original: reservationDate,
      date: new Date(reservationDate),
      day: new Date(reservationDate).getDay(),
    };
  }

  parsedReservationRoom(reservationRoom) {
    const trimmed = reservationRoom.trim();
    return trimmed;
  }

  parsedReservationTime(parsedTime) {
    const trimmed = parsedTime.trim();
    const [startTime, endTime] = trimmed.split('-');

    // 시작 시간
    const [startHour, startMin] = startTime.split(':').map(Number);
    const start = startHour * 60 + startMin;

    // 끝난 시간
    const [endHour, endMin] = endTime.split(':').map(Number);
    const end = endHour * 60 + endMin;

    return { original: trimmed, start, end };
  }

  parsedReservationUsers(reservationUsers) {
    const trimmed = Number(reservationUsers.trim());
    return trimmed;
  }
}

export default InputParser;
