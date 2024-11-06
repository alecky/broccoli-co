import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Modal from '.';

describe('Modal', () => {
    it('should render title', () => {
        const title = 'Modal title';
        render(<Modal title={title} />);
        const heading = screen.getByRole('heading');
        expect(heading).toHaveTextContent(title);
    });
    it('should render content', async () => {
        const content = 'This is the content';
        render(<Modal title="title">{content}</Modal>);
        expect(await screen.findByText(content)).toBeVisible()
    });
    it('should call onClose on close click', () => {
        const onCloseMock = jest.fn();
        render(<Modal title="title" onClose={onCloseMock}>content</Modal>);
        const closeButton = screen.getByRole('button');
        fireEvent.click(closeButton);
        expect(onCloseMock).toHaveBeenCalled();
    });
    it('should call onClose on overlay click', () => {
        const onCloseMock = jest.fn();
        render(<Modal title="title" onClose={onCloseMock}>content</Modal>);
        const modalOverlay = document.querySelector('div.modal-overlay');
        modalOverlay && fireEvent.click(modalOverlay);
        expect(onCloseMock).toHaveBeenCalled();
    });
});