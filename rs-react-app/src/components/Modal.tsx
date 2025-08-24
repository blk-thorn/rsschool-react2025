import React, { type ReactPortal, useEffect, useState } from 'react';
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

  useEffect((): (() => void) => {
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

  if (!isOpen || !modalRoot) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-gray-400 p-4 rounded-xl shadow-xl w-[35%]"
        onClick={(e): void => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    modalRoot
  );
};
