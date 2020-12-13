import React, {
  useEffect,
  useImperativeHandle,
  useState,
  forwardRef,
  useCallback,
  useContext,
} from "react";
import { createPortal } from "react-dom";
import GroceryContext from "../../State/Context/GroceryContext";
import "./styles.css";
import { isPropertySignature } from "typescript";

const modalElement = document.getElementById("modal");

export function Modal({ children, ref }) {
  console.log("props", children);
  const [isOpen, setIsOpen] = useState(children.props.defaultOpened);
  //const [state, dispatch] = useContext(GroceryContext);

  // setIsOpen(state.isModal);
  const close = useCallback(() => setIsOpen(false), []);

  useImperativeHandle(
    ref,
    () => ({
      open: () => setIsOpen(true),
      close,
    }),
    [close]
  );

  const handleEscape = useCallback(
    (event) => {
      if (event.keyCode === 27) close();
    },
    [close]
  );

  useEffect(() => {
    if (isOpen) document.addEventListener("keydown", handleEscape, false);
    return () => {
      document.removeEventListener("keydown", handleEscape, false);
    };
  }, [handleEscape, isOpen]);

  return createPortal(
    isOpen ? (
      <div className={`modal`}>
        <div className="modal-overlay" onClick={close} />
        <span
          role="button"
          className="modal-close"
          aria-label="close"
          onClick={close}
        >
          x
        </span>
        <div className="modal-body">{children}</div>
      </div>
    ) : null,
    modalElement
  );
}

export default forwardRef(Modal);
