/* 
  new Date(): Thu Nov 10 2022 20:33:47 GMT+0800 (中国标准时间)
  new Date().getTime(): 1668083639032

  example
  import { Time } from 'shared/time';
  const time = new Time();
  time.format('YYYY-MM-DD');
  time.firstDayOfMonth();
  time.firstDayOfYear();
  time.lastDayOfMonth();
  time.lastDayOfYear();
  time.add(1, 'month');
*/
export class Time {
  date: Date
  constructor(date: string | Date = new Date()) {
    this.date = typeof date === 'string' ? new Date(date) : date
  }
  format(pattern = 'YYYY-MM-DD') {
    // 目前支持的格式有 YYYY MM DD HH mm ss SSS
    const year = this.date.getFullYear()
    const month = this.date.getMonth() + 1 // getMonth的返回值是0-11
    const day = this.date.getDate() // 获取day
    const hour = this.date.getHours()
    const minute = this.date.getMinutes()
    const second = this.date.getSeconds()
    const msecond = this.date.getMilliseconds()
    return pattern
      .replace(/YYYY/g, year.toString())
      .replace(/MM/, month.toString().padStart(2, '0')) // 利用padStart保证两位数
      .replace(/DD/, day.toString().padStart(2, '0'))
      .replace(/HH/, hour.toString().padStart(2, '0'))
      .replace(/mm/, minute.toString().padStart(2, '0'))
      .replace(/ss/, second.toString().padStart(2, '0'))
      .replace(/SSS/, msecond.toString().padStart(3, '0'))
  }
  firstDayOfMonth() {
    return new Time(new Date(this.date.getFullYear(), this.date.getMonth(), 1, 0, 0, 0))
  }
  firstDayOfYear() {
    // 当前年的1月1号
    return new Time(new Date(this.date.getFullYear(), 0, 1, 0, 0, 0))
  }
  // 当前月最后一天
  lastDayOfMonth() {
    // 也是下月1号的前一天
    return new Time(new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0, 0, 0, 0))
  }
  // 当前年最后一天
  lastDayOfYear() {
    // 也是下一年的1月1号的前一天
    return new Time(new Date(this.date.getFullYear() + 1, 0, 0, 0, 0, 0))
  }
  getRaw() {
    return this.date
  }
  getTimeStamp() {
    return this.date.getTime()
  }
  add(
    amount: number,
    unit: 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second' | 'millisecond'
  ) {
    // return new Time but not change this.date
    let date = new Date(this.date.getTime())
    switch (unit) {
      case 'year':
        const currentDate = date.getDate()
        date.setDate(1)
        date.setFullYear(date.getFullYear() + amount)
        const targetDate = new Date(date.getFullYear(), date.getMonth() + 1, 0, 0, 0, 0).getDate()
        date.setDate(Math.min(currentDate, targetDate))
        break
      case 'month':
        const d = date.getDate()
        date.setDate(1)
        date.setMonth(date.getMonth() + amount)
        const d2 = new Date(date.getFullYear(), date.getMonth() + 1, 0, 0, 0, 0).getDate()
        date.setDate(Math.min(d, d2))
        break
      case 'day':
        date.setDate(date.getDate() + amount)
        break
      case 'hour':
        date.setHours(date.getHours() + amount)
        break
      case 'minute':
        date.setMinutes(date.getMinutes() + amount)
        break
      case 'second':
        date.setSeconds(date.getSeconds() + amount)
        break
      case 'millisecond':
        date.setMilliseconds(date.getMilliseconds() + amount)
        break
      default:
        throw new Error('Time.add: unknown unit')
    }
    return new Time(date)
  }
}
