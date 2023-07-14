import { HofListContainer } from "../../style/hallOfFameStyled"
import HofCard from "./HofCard"
import { useAppSelector } from "../../store/hook"
import HofAddModal from "./HofAddModal"
import { useState } from "react"
import type { Hof } from "../../store/slice"
import Swal from "sweetalert2"

const HofList = () => {
  const { hofData, loginUser } = useAppSelector(state => state.membersData)
  const sortHofData = [...hofData].sort((a, b) => {
    return (new Date(b[1].eventDate).getTime() - new Date(a[1].eventDate).getTime())
  })
  const [ isModal, setIsModal ] = useState(false)
  const [ sendAward, setSendAward ] = useState<[string, Hof] | undefined>()

  const handleModal = (award: [string, Hof]) => {
    if(loginUser.level >= 2){
      window.scrollTo(0,0)
      setSendAward(award)
      setIsModal(true)

    }else{
      Swal.fire({
        icon: 'warning',
        title: '운영진 계정만 수정이 가능해요!',
         showConfirmButton: false,
        timer: 800
      })
    }
  }

  return (
    <HofListContainer>
      {sortHofData.map((award, i) => (
        <HofCard key={i} award={award[1]} onClick={() => handleModal(award)}/>
      ))}
      {isModal ? <HofAddModal setIsModal={setIsModal} award={sendAward}/> : null}
    </HofListContainer>
  )
}

export default HofList