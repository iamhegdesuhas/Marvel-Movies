import React, { useState, useEffect } from 'react';

type Props = {
  children: any;
  delay?: number;
};

export const DelayedComponent = ({ children, delay = 500 }: Props) => {
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsShown(true);
    }, delay);
  }, [delay]);

  return isShown ? children : null;
};