import useMediaQuery from "../mediaQuery/mediaQuery";
export const useIsSmall = () => useMediaQuery("(min-width: 640px)");
