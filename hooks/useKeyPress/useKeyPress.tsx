import { useEffect } from "react";

type KeyHandler = () => void;

export const useKeyPress = (
  targetRef: React.MutableRefObject<HTMLElement | null>,
  key: string,
  onAction: KeyHandler,
  checkShift: boolean = false
) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        targetRef.current &&
        (!checkShift || event.shiftKey) &&
        event.key === key &&
        document.activeElement === targetRef.current
      ) {
        onAction();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [targetRef, key, onAction, checkShift]);
};
