import { Btn, BtnListContainer } from "../style/globalStyled"
import { useAppSelector, useAppDispatch } from "../store/hook"
import { toggleModal, sendMember } from "../store/slice"
import { BiMale, BiFemale, BiMaleFemale } from 'react-icons/bi'
import { useNavigate  } from "react-router"
import Swal from "sweetalert2"

const BtnList = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { membersData, loginUser } = useAppSelector(state => state.membersData)

  const totalMembers = membersData.length
  const totalGender = (param: string) => {return membersData.reduce((acc: number, member) => {
    let gender = member[1].gender
    if(gender === param) {return acc + 1}
      else {return acc}
    }, 0)
  }

  const handleAddMember = () => {
    //레벨 2 이상부터 운영진
    if(loginUser.level >= 2){
      dispatch(toggleModal()), dispatch(sendMember({
        id: '', 
        name: '',
        join: '',
        year: '',
        etc: '',
        state: false
      }))
    } else {
      Swal.fire({
        icon: 'warning',
        title: '운영진 계정만 가능해요!',
         showConfirmButton: false,
        timer: 800
      })
    }
  }

  return (
    <BtnListContainer>
      <Btn className='totalReview'>
        <span className="total">총원<BiMaleFemale/></span>
        <span className="number">{totalMembers}</span>
        <span className="male">남<BiMale /></span>
        <span className="number">{totalGender('남')}</span>
        <span className="female">여<BiFemale /></span>
        <span className="number">{totalGender('여')}</span>
      </Btn>
      <Btn onClick={()=> handleAddMember()}>
        <p>회원추가</p>
      </Btn>
      <Btn onClick={() => {navigate('/searchpage')}}>
        <p>검색</p>
      </Btn>

    </BtnListContainer>
  )
}

export default BtnList