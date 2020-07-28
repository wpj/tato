export type ResponsiveProp<Atom> =
  | Atom
  | Readonly<[Atom, Atom]>
  | Readonly<[Atom, Atom, Atom]>;

type Map<Atom extends string | number> = Record<Atom, string[]>;

export function resolve<Atom extends string | number>(
  value: ResponsiveProp<Atom>,
  map: Map<Atom>,
) {
  function isAtom(val: ResponsiveProp<Atom>): val is Atom {
    return typeof val === 'string' || typeof val === 'number';
  }

  if (isAtom(value)) {
    return map[value][0];
  } else {
    return value.map((val, index) => {
      return map[val][index];
    });
  }
}
