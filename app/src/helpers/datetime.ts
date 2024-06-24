import moment, { Moment } from 'moment';
import { DATE_FORMAT } from 'constants/datetime';

export class DatetimeHelper {
  static format(date: string | moment.MomentInput, format = DATE_FORMAT): string {
    if (!date) return '';
    return moment(date).format(format);
  }

  static now(format = DATE_FORMAT): string {
    return moment().format(format);
  }

  static trimOffTimeZoneOffset(dateStr: Date): Moment {
    return moment.parseZone(dateStr);
  }
  static getDaysArray = function (start: string, end: string) {
    const fromDate = moment(start)
    const toDate = moment(moment(start).clone().add(14, 'days'))
    const diff = toDate.diff(fromDate, 'days')
    const range = []
    for (let i = 0; i < diff; i++) {
      range.push(moment(start).add(i, 'days'))
    }
    return range
  }
}

