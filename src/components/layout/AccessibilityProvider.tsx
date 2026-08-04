import { useEffect, type ReactNode } from 'react';
import type { AccessibilitySettings } from '../../types';

interface Props {
  settings: AccessibilitySettings;
  children: ReactNode;
}

export function AccessibilityProvider({ settings, children }: Props) {
  useEffect(() => {
    document.documentElement.setAttribute('data-font-size', settings.fontSize);
    document.documentElement.setAttribute('data-simplified', String(settings.simplifiedUI));
  }, [settings.fontSize, settings.simplifiedUI]);

  return <>{children}</>;
}
