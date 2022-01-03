import styled, { keyframes } from 'styled-components'

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: fit-content;

  button {
    // margin-top: 24px;
    // width: 100%;
    -webkit-user-select: none;
    user-select: none;
    -webkit-app-region: drag;

    height: 42px;
    width: 80px;
  }

  background: #8257e6;
`

export const Image = styled.img`
  animation: ${rotate} 15s linear infinite;
`

export const Text = styled.p`
  // margin-top: 24px;
  font-size: 18px;
`
