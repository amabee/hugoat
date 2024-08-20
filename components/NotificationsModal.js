import React from "react";
import { Modal, Card } from "react-bootstrap";

export default function NotificationsModal({ show, onHide }) {
  return (
    <Modal show={show} onHide={onHide} className="text-white">
      <Modal.Header
        closeButton
        closeVariant="white"
        className="bg-dark border-secondary"
      >
        <Modal.Title>NOTIFICATIONS</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-dark">
        <Card className="bg-secondary mb-3">
          <Card.Body className="d-flex align-items-center">
            <div className="notification-icon me-3">
              <img
                src="/images/maloi.jpg"
                className="rounded-circle"
                height={50}
              />
            </div>
            <div className="flex-grow-1">
              <Card.Title>TEXT HERE</Card.Title>
              <Card.Text className="mb-0">ANOTHER TEXT HERE</Card.Text>
            </div>
            <small className="timestamp">TIMESTAMP</small>
          </Card.Body>
        </Card>
      </Modal.Body>
    </Modal>
  );
}
