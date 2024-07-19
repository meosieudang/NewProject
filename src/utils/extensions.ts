import _, { LoDashStatic } from 'lodash';
import { fakerVI } from '@faker-js/faker';

declare global {
    interface Window {
        _: LoDashStatic;
        faker: any;
    }
}

window._ = _;
window.faker = fakerVI;
