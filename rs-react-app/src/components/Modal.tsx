import React, { type ReactPortal, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
}: ModalProps): ReactPortal | null => {
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let root: HTMLElement | null = document.getElementById('modal-root');
    if (!root) {
      root = document.createElement('div');
      root.id = 'modal-root';
      document.body.appendChild(root);
    }
    setModalRoot(root);

    const handleKey: (e: KeyboardEvent) => void = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);

    return (): void => {
      document.removeEventListener('keydown', handleKey);
    };
  }, [onClose]);

  useEffect((): void => {
    if (isOpen) {
      modalContentRef.current?.focus();
    }
  }, [isOpen]);

  if (!isOpen || !modalRoot) return null;

  return ReactDOM.createPortal(
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div
        ref={modalContentRef}
        tabIndex={-1}
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-400 p-4 rounded-xl shadow-xl w-[35%] outline-none"
        onClick={(e): void => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {children}
      </div>
    </>,
    modalRoot
  );
};
