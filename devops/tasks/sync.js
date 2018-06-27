import gulp from 'gulp';
import yargs from 'yargs';
import browserSync from 'browser-sync';
import connectLoggerMiddleware from 'connect-logger';
import mockerMiddleware from '../utils/mocker-middleware';
import mockHandlers from '../mocks';
import { PATHS, BS_PORT, IS_DEBUG, IS_MOCK } from '../config';

const IS_AUTO_RELOAD = !!yargs.argv['sync-auto-reload'];

let browserSyncInst;

let middlewares = [];

if (IS_DEBUG) {
  middlewares.push(connectLoggerMiddleware());
}

if (IS_MOCK) {
  middlewares.push(mockerMiddleware({ handlers: mockHandlers }));
}

const serverOptions = {
  server: {
    baseDir: PATHS.BUILD,
    middleware: middlewares,
  },
  ui: {
    port: BS_PORT,
  },
  notify: false,
  startPath: '/',
  reloadDelay: 1500,
  reloadDebounce: 1500,
  injectChanges: true,
  logConnections: true
};

function sync(cb) {
  browserSyncInst = browserSync.create();

  browserSyncInst.init(serverOptions, () => {
    if (IS_AUTO_RELOAD) {
      gulp.watch([`${PATHS.BUILD}/**/*.*`], browserSyncInst.reload);
    }

    cb();
  });
}

export { sync };
