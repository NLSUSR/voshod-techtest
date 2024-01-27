import { useRef, useEffect, ReactNode } from "react";
import styled from "styled-components";

const DialogElement = styled.dialog`
  margin: auto auto;
  width: fit-content;
  height: fit-content;
  border-radius: 20px;
  background: #f0f1f6;
  border: none;
  position: relative;
  overflow: hidden;
  &::backdrop {
    position: fixed;
    background: rgba(0, 0, 0, 0.7);
  }
`;

const Close = styled.button`
  color: black;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  border: none;
  position: absolute;
  top: 30px;
  right: 30px;
`;

const Content = styled.section`
  display: flex;
  flex-direction: column;
`;

export const Dialog = (props: { children?: ReactNode; state: boolean }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    props.state ? dialogRef.current?.showModal() : dialogRef.current?.close();
  }, [props.state]);

  return (
    <DialogElement
      ref={dialogRef}
      onClick={(e) =>
        e.target === e.currentTarget ? dialogRef.current?.close() : null
      }
    >
      <Close onClick={() => dialogRef.current?.close()}>Закрыть</Close>
      <Content>{props.children}</Content>
    </DialogElement>
  );
};
