import classnames from 'classnames';
import { twMerge } from 'tailwind-merge';

export default function cn(...args: classnames.ArgumentArray) {
  return twMerge(classnames(args));
}
