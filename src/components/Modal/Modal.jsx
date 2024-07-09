import { createPortal } from "react-dom";
import { IoCloseCircleSharp } from "react-icons/io5";

const Modal = (props) => {
  const { open, onClose, children } = props;
  return createPortal(
    <>
      {open && (
        <>
          <div className="absolute top-3 z-30 flex h-[90svh] w-full items-center justify-center">
            <div className="relative flex h-2/3 w-3/6 overflow-hidden rounded-lg bg-white shadow-lg shadow-black">
              <div className="flex w-full justify-center">{children}</div>
              <button className="absolute right-0 top-0" onClick={onClose}>
                <IoCloseCircleSharp className="size-9" />
              </button>
            </div>
          </div>
          <div
            className="absolute top-0 z-10 h-full w-full bg-black bg-opacity-35"
            onClick={onClose}
          />
        </>
      )}
    </>,
    document.getElementById("modal-root"),
  );
};

export default Modal;
