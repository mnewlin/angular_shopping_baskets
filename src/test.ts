import "zone.js/dist/zone-testing";
import { getTestBed } from "@angular/core/testing";
import {
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting
} from "@angular/platform-browser-dynamic/testing";

declare const require: any;

// first, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting()
);
// then we find all the tests.
// tslint:disable-next-line: typedef
const context = require.context("./", true, /\.spec\.ts$/);
// and load the modules.
context.keys().map(context);