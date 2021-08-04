type ResponsiveAtom<Atom> = Partial<Record<'sm' | 'md' | 'lg', Atom>>;
export type ResponsiveProp<Atom> = Atom | ResponsiveAtom<Atom>;

type Map<Atom extends string | number> = Record<
  Atom,
  Partial<Record<'sm' | 'md' | 'lg', string>>
>;

function isResponsive<Atom>(
  val: ResponsiveProp<Atom>,
): val is ResponsiveAtom<Atom> {
  return typeof val !== 'string' &&  typeof val !== 'number';
}

export function resolve<Atom extends string | number>(
  value: ResponsiveProp<Atom>,
  map: Map<Atom>,
) {
  if (!isResponsive(value)) {
    return map[value].sm;
  } else {
    const { sm, md, lg } = value;

    return [sm && map[sm].sm, md && map[md].md, lg && map[lg].lg].filter((v) =>
      Boolean(v),
    );
  }
}
