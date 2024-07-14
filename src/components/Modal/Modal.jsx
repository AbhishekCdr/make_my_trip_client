import { createPortal } from "react-dom";
import { IoCloseCircleSharp } from "react-icons/io5";

const Modal = (props) => {
  const { open, onClose, children } = props;
  return createPortal(
    <>
      {open && (
        <>
          <div className="fixed left-1/2 top-1/2 z-50 flex min-h-svh w-full -translate-x-1/2 -translate-y-1/2 transform items-center justify-center">
            <div className="relative flex min-h-96 w-3/6 overflow-hidden rounded-lg bg-white shadow-lg shadow-black">
              <div className="flex w-full justify-center p-3">{children}</div>
              <button className="absolute right-0 top-0 m-4" onClick={onClose}>
                <IoCloseCircleSharp className="text-3xl text-gray-700" />
              </button>
            </div>
          </div>
          <div
            className="fixed left-0 top-0 z-40 h-full w-full bg-black bg-opacity-50"
            onClick={onClose}
          />
        </>
      )}
    </>,
    document.getElementById("modal-root"),
  );
};

export default Modal;
