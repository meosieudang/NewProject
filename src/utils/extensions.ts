import _, { LoDashStatic } from 'lodash';
import * as dayjs from 'dayjs';

declare global {
    interface Window {
        _: LoDashStatic;
        dayjs: {};
    }
}

window._ = _;
window.dayjs = dayjs;
