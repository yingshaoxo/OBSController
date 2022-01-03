import { GlobalStyle } from './styles/GlobalStyle'

import { PauseOrResumeButton } from './components/PauseOrResumeButton'
import { ChracterView } from './components/Character'

export function App() {
  return (
    <>

      <GlobalStyle />

      <ChracterView></ChracterView>

      {/* <div style={
        {
          display: 'flex',
          justifyContent: 'center',
        }
      }>
        <PauseOrResumeButton />
      </div> */}
    </>
  )
}