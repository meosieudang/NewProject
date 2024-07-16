import _, { LoDashStatic } from 'lodash';
import { faker, Faker } from '@faker-js/faker';

declare global {
    interface Window {
        _: LoDashStatic;
        faker: Faker;
    }
}

window._ = _;
window.faker = faker;
