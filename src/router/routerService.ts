
let routerInstance: { replace: (arg0: string) => void; } | null = null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setRouter = (router: any) => {
  routerInstance = router;
};

export const getRouter = () => {
  return routerInstance;
};

export const navigateToLogin = () => {
  if (routerInstance) {
    routerInstance.replace('/');
  } else {
    // Fallback
    window.location.href = '/';
  }
};
