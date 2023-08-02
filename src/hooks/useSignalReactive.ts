/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-plusplus */
import { useMemo  } from 'preact/hooks';
import { useSyncExternalStore  } from 'preact/compat';
import { effect, type ReadonlySignal } from '@preact/signals';

const noop = (a: any) => a;

function createEffectStore(...signals: ReadonlySignal[]) {
  let version = 0;
  let onChangeNotifyReact: () => void;
  const unsubscribe = effect(() => {
    signals.forEach((s) => {
      noop(s.value);
    });
    version++;
    onChangeNotifyReact?.();
  });

  return {
    subscribe(onStoreChange: () => void) {
      onChangeNotifyReact = onStoreChange;
      return () => {
        unsubscribe();
      };
    },
    getSnapshot() {
      return version;
    },
  };
}

export default function useSignalReactive(...signals: ReadonlySignal[]) {
  const store = useMemo(() => {
    return createEffectStore(...signals);
  }, signals);
  useSyncExternalStore(store.subscribe, store.getSnapshot, store.getSnapshot);
}
