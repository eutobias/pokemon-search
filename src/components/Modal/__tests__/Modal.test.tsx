import { fireEvent, render, screen } from "@testing-library/react";
import React, { useState } from "react";

import { Modal } from "../Modal";

type MockModalProps = {
  show: boolean;
};
const MockModal: React.FC<React.PropsWithChildren<MockModalProps>> = ({
  show,
}) => {
  const [showModal, setShowModal] = useState<boolean>(show);

  const onClose = () => setShowModal(false);

  return (
    <Modal show={showModal} onClose={onClose}>
      Modal Test Content
    </Modal>
  );
};

describe("Modal", () => {
  it("Should render", () => {
    render(<MockModal show={true}>Modal Test Content</MockModal>);

    const modalElement = screen.getByText("Modal Test Content");

    expect(modalElement).toBeInTheDocument();
  });

  it("Should not render", () => {
    render(<MockModal show={false}>Modal Test Content</MockModal>);

    const modalElement = screen.queryByText("Modal Test Content");

    expect(modalElement).not.toBeInTheDocument();
  });

  it("Should render then close", () => {
    render(<MockModal show={true}>Modal Test Content</MockModal>);

    const modalElement = screen.getByText("Modal Test Content");
    expect(modalElement).toBeInTheDocument();

    const buttonClose = screen.getByText("Fechar");
    fireEvent.click(buttonClose);

    const closedModalElement = screen.queryByText("Modal Test Content");
    expect(closedModalElement).not.toBeInTheDocument();
  });
});
