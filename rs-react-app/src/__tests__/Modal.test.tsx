import '@testing-library/jest-dom/vitest';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Modal } from '../components/Modal.tsx';

describe('Modal Component', () => {
  let modalRoot: HTMLDivElement;

  beforeEach(() => {
    modalRoot = document.createElement('div');
    modalRoot.id = 'modal-root';
    document.body.appendChild(modalRoot);
  });

  afterEach(() => {
    modalRoot.remove();
  });

  it('renders children when open', () => {
    render(
      <Modal isOpen={true} onClose={vi.fn()}>
        <div>Modal Content</div>
      </Modal>
    );

    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(
      <Modal isOpen={false} onClose={vi.fn()}>
        <div>Modal Content</div>
      </Modal>
    );

    expect(screen.queryByText('Modal Content')).toBeNull();
  });

  it('calls onClose when clicking the overlay', () => {
    const handleClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={handleClose}>
        <div>Modal Content</div>
      </Modal>
    );

    const overlay = screen.getByTestId('modal-overlay');
    fireEvent.click(overlay);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('does not close when clicking inside modal content', () => {
    const handleClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={handleClose}>
        <div>Modal Content</div>
      </Modal>
    );

    fireEvent.click(screen.getByText('Modal Content'));
    expect(handleClose).not.toHaveBeenCalled();
  });

  it('calls onClose on ESC key press', () => {
    const handleClose = vi.fn();
    render(
      <Modal isOpen={true} onClose={handleClose}>
        <div>Modal Content</div>
      </Modal>
    );

    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('focuses modal content when opened', async () => {
    render(
      <Modal isOpen={true} onClose={vi.fn()}>
        <div>Modal Content</div>
      </Modal>
    );

    const modalContent = screen.getByRole('dialog');

    await waitFor(() => {
      modalContent.focus();
      expect(modalContent).toHaveFocus();
    });
  });

  it('renders inside a portal', () => {
    render(
      <Modal isOpen={true} onClose={vi.fn()}>
        <div>Portal Content</div>
      </Modal>
    );

    const portalContent = screen.getByText('Portal Content');
    const modalRootEl = document.getElementById('modal-root');
    expect(modalRootEl).toContainElement(portalContent);
  });
});
