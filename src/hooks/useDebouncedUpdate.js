import { useRef, useEffect } from "react";
import { debounce } from "lodash";
import updateDraft from "@/utils/draftUpdater";

const useDebouncedUpdate = () => {
  const debouncedRef = useRef();

  if (!debouncedRef.current) {
    debouncedRef.current = debounce((fieldName, value) => {
      updateDraft(fieldName, value );
    }, 500);
  }

  useEffect(() => {
    return () => {
      debouncedRef.current.cancel();
    };
  }, []);

  return debouncedRef.current;
};

export default useDebouncedUpdate;
