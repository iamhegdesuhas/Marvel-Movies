import { useState, useEffect } from 'react';

type Props = {
  children: any;
  delay?: number;
};

const DelayedComponent = ({ children, delay = 500 }: Props) => {
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsShown(true);
    }, delay);
  }, [delay]);

  return isShown ? children : null;
};

export default DelayedComponent;