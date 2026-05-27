import { from12Hour, resolveIs12Hour, setTime, to12Hour } from './datepicker.utils';

describe('datepicker time utils', () => {
  describe('setTime', () => {
    it('sets hours/minutes and zeroes seconds/ms without mutating input', () => {
      const base = new Date(2024, 5, 15, 9, 30, 45, 123);
      const out = setTime(base, 14, 5);
      expect(out.getFullYear()).toBe(2024);
      expect(out.getMonth()).toBe(5);
      expect(out.getDate()).toBe(15);
      expect(out.getHours()).toBe(14);
      expect(out.getMinutes()).toBe(5);
      expect(out.getSeconds()).toBe(0);
      expect(out.getMilliseconds()).toBe(0);
      // input untouched
      expect(base.getHours()).toBe(9);
    });
  });

  describe('resolveIs12Hour', () => {
    it('honors explicit override', () => {
      expect(resolveIs12Hour('pt-BR', '12')).toBe(true);
      expect(resolveIs12Hour('en-US', '24')).toBe(false);
    });

    it('derives from locale when auto', () => {
      expect(resolveIs12Hour('en-US', 'auto')).toBe(true);
      expect(resolveIs12Hour('pt-BR', 'auto')).toBe(false);
    });
  });

  describe('to12Hour / from12Hour', () => {
    it('converts 24h to 12h with meridiem', () => {
      expect(to12Hour(0)).toEqual({ hour: 12, meridiem: 'AM' });
      expect(to12Hour(11)).toEqual({ hour: 11, meridiem: 'AM' });
      expect(to12Hour(12)).toEqual({ hour: 12, meridiem: 'PM' });
      expect(to12Hour(23)).toEqual({ hour: 11, meridiem: 'PM' });
    });

    it('converts 12h back to 24h', () => {
      expect(from12Hour(12, 'AM')).toBe(0);
      expect(from12Hour(11, 'AM')).toBe(11);
      expect(from12Hour(12, 'PM')).toBe(12);
      expect(from12Hour(11, 'PM')).toBe(23);
    });

    it('round-trips every hour', () => {
      for (let h = 0; h < 24; h++) {
        const { hour, meridiem } = to12Hour(h);
        expect(from12Hour(hour, meridiem)).toBe(h);
      }
    });
  });
});
