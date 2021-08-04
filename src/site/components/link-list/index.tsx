import React from 'react';

import { Link } from '../link';
import { List, Text } from '../../ds';

interface LinkItem {
  href: string;
  text: string;
}

const PostIndex = ({ items }: { items: LinkItem[] }) => {
  return (
    <List space={{ sm: 'medium', md: 'large' }}>
      {items.map((item) => {
        return (
          <li key={item.href}>
            <Link to={item.href}>
              <Text size="medium">{item.text}</Text>
            </Link>
          </li>
        );
      })}
    </List>
  );
};

export default PostIndex;
