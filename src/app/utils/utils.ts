import { useEffect } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function afterMount(func: () => any) {
  useEffect(() => {
    func();
  }, [func]);
}
