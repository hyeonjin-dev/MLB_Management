import Footer from "../components/common/Footer"
import SecretBoardList from "../components/secretboard/SecretBoardList"
import { SecretBoardContainer } from "../style/secretBoardStyled"
import { useState, useEffect } from "react"
import { dbFunc } from "../firebase/firebaseFunc"
import { useAppSelector } from "../store/hook"
import Waiting from "../components/common/Waiting"


const SecretBoard = () => {
  const [ board, setBoard ] = useState([])
  const { loginUser } = useAppSelector(state => state.membersData)

  useEffect(() => {
    dbFunc.getBoard((value: any) => {
      setBoard(value.reverse())
    })
  }, [])
  
  return (
    <>{loginUser.level >= 1 ?
      <SecretBoardContainer>
      <p className="notice">칭찬게시판은 익명게시판이며 글을 누가 썼는지 확인할 수 없습니다. 자유롭게 아무말이나 써주세요!
      </p>
      <SecretBoardList board={board}/>
      <Footer />
    </SecretBoardContainer> :
    <Waiting />}
    </>
  )
}

export default SecretBoard