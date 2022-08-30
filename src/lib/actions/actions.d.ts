declare namespace svelte.JSX {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface HTMLAttributes<T> {
    'oncustom:copied'?: EventHandler<Event, T> | undefined | null;
    'oncustom:copied:error'?: EventHandler<Event, T> | undefined | null;
    'oncustom:timeout'?: EventHandler<Event, T> | undefined | null;
  }
}
