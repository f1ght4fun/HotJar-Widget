// tslint:disable:no-string-literal
import { preventDefaults } from './misc.util';
describe('Misc Functions', () => {
  it('preventDefaults', () => {
    const e = jasmine.createSpyObj('e', ['preventDefault', 'stopPropagation', 'stopImmediatePropagation']);
    preventDefaults(e);
    expect(e.preventDefault).toHaveBeenCalled();
    expect(e.stopPropagation).toHaveBeenCalled();
    expect(e.stopImmediatePropagation).toHaveBeenCalled();
  });
});
