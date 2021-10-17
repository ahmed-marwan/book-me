import React from 'react';
import { Alert } from 'react-bootstrap';

interface MessageProps {
  variant: string;
  children: React.ReactNode;
}

function Message({ variant = 'blue', children }: MessageProps) {
  return <Alert variant={variant}>{children}</Alert>;
}

export default Message;
