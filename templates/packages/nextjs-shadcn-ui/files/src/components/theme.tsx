'use client';

// biome-ignore lint/style/noExportedImports: <"allow standard practice">
import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes';
import type * as React from 'react';

function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

export { ThemeProvider, useTheme };
