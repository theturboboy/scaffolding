import path from 'path';
import del from 'del';
import { PATHS } from '../config';

function clean() {
  return del([path.join(PATHS.BUILD, '**/*')], { force: true });
}

export { clean };
