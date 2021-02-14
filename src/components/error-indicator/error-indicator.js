import React from "react";
import Alert from "react-bootstrap";

const ErrorIndicator = () => {
  return (
    <Alert variant="danger" dismissible>
      <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
      something has gone terribly wrong
    </Alert>
  );
};

export default ErrorIndicator;
