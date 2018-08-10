import { Component, Input, Output, EventEmitter } from '@angular/core';
import moment, { Moment } from 'moment';
import { CalendarController } from '../calendar-controller';

@Component({
  selector: 'calendar-day',
  templateUrl: 'calendar-day.html'
})
export class CalendarDayComponent {
  // 当前显示的日期
  @Input()
  date: string;

  // 月份时间
  @Input()
  dateMonth: Moment;

  // 选择时间
  @Output()
  onSelect = new EventEmitter<string>();

  // 当前日程对象
  get schedule() {
    return this.calendarCtrl.schedules.find(val => val.date === this.date);
  }

  // 有日程
  get haveSchedule(): boolean {
    return !!this.schedule;
  }

  get isSameActiveMonth(): boolean {
    return moment(this.calendarCtrl.activeDate()).isSame(this.date, 'month');
  }

  get isToday(): boolean {
    return this.date === moment().format('YYYY-MM-DD');
  }

  // 当前月份
  get isCurrentMonth(): boolean {
    return this.dateMonth.isSame(this.date, 'month');
  }

  get isSelectDay(): boolean {
    // 当前日期
    return (
      this.isSameActiveMonth &&
      this.date === this.dateMonth.format('YYYY-MM-DD')
    );
  }

  constructor(private calendarCtrl: CalendarController) {}

  select() {
    // 不能选择小于 1970-01-01
    if (moment(this.date).isBefore('1970-01-01')) return;

    if (this.isCurrentMonth) {
      this.dateMonth.set('date', moment(this.date).date());
    }

    this.onSelect.emit(this.date);
  }
}
