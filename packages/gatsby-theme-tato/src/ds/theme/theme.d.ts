import tokens from './tokens';

declare module 'treat/theme' {
  type Tokens = typeof tokens;

  export interface Theme extends Tokens {}
}
