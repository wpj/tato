import cc from 'classcat';
import { ElementType } from 'react';

import * as reset from './styles/reset.css';

export type ResetStyles = typeof reset;

export const useResetStyles = () => reset;

export function useReset(element: ElementType) {
  let resetStyles = useResetStyles();

  return cc([
    resetStyles.base,
    resetStyles.element[element as keyof ResetStyles['element']],
  ]);
}
