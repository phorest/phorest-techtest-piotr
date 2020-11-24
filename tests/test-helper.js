import Application from 'phorest-techtest-piotr/app';
import config from 'phorest-techtest-piotr/config/environment';
import { setApplication } from '@ember/test-helpers';
import { start } from 'ember-qunit';

setApplication(Application.create(config.APP));

start();
