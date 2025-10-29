import { describe, expect, it, beforeEach, vi } from 'vitest';

import { getAppThemeFromLocalStorage, setAppThemeToLocalStorage } from './storage';

describe('App Theme Storage', () => {
  // Mock localStorage
  beforeEach(() => {
    vi.stubGlobal('localStorage', {
      getItem: vi.fn(),
      setItem: vi.fn(),
    });
  });

  it('getAppThemeFromLocalStorage returns "light" by default if nothing is set', () => {
    (localStorage.getItem as any).mockReturnValue(null);
    expect(getAppThemeFromLocalStorage()).toBe('light');
  });

  it('getAppThemeFromLocalStorage returns the value set by setAppThemeToLocalStorage', () => {
    setAppThemeToLocalStorage('dark');
    // Mock getItem to return the value we just set
    (localStorage.getItem as any).mockReturnValue('dark');
    expect(getAppThemeFromLocalStorage()).toBe('dark');
  });

  it('setAppThemeToLocalStorage calls localStorage.setItem and returns undefined', () => {
    const result = setAppThemeToLocalStorage('dark');

    expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'dark');
    expect(result).toBeUndefined();
  });
});
