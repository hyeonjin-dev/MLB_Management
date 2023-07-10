import { useState, useEffect } from "react"
import { Btn } from "../style/globalStyled"
import { EditorContainer, SecretBoardBtnContainer, SecretBoardContainer } from "../style/secretBoardStyled"
import { dbFunc } from "../firebase/firebaseFunc"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useAppSelector } from "../store/hook"
import Swal from "sweetalert2"

const SecretBoardWrite = () => {
  const { id } = useParams()
  const { loginUser } = useAppSelector(state => state.membersData)

  const [ title, setTitle ] = useState('')
  const [ content, setContent ] = useState('')
  const [ secret, setSecret ] = useState(false)

  const navigate = useNavigate()

  const getToday = () => {
    const date = new Date()
    const year = String(date.getFullYear())
    const month = String(date.getMonth() + 1).padStart(2,'0')
    const day = String(date.getDate()).padStart(2,'0')
    return `${year}.${month}.${day}`
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    //기존 글 수정
    if(id !== '0'){
      const update = {
        title, content, secret
      }
      dbFunc.updateArticle(id as string, update)
    }else{
      //신규 글 작성
      const date = getToday()
      const add = {title, content, date, secret, uid: loginUser.uid}
      if(title && content){
        dbFunc.addArticle(add)
        Swal.fire({
          icon: 'success',
          title: `글이 작성되었어요!`,
          showConfirmButton: false,
          timer: 800
        })
      navigate('/secretboard')

      }else{
        Swal.fire({
          html: `
            제목과 내용을 채워주세요!
          `,
          icon: 'warning',
          showCancelButton: false,
          confirmButtonText: "알겠습니다 ㅠㅠ",
        })
      }
    }
  }

  useEffect(() => {
    if(id !== '0'){
      dbFunc.getArticle(id).then((data) => {
        setTitle(data.title)
        setContent(data.content)
        setSecret(data.secret)
      })
    }
  }, [])

  const handleDelete = () => {
    Swal.fire({
      title: `정말로 지우시겠어요?`,
      text: "한번 지우면 복구할 수 없어요!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e99797',
      cancelButtonColor: '#4ec6e4',
      confirmButtonText: '지우겠습니다.',
      cancelButtonText: '지우지 않겠습니다.'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: '삭제완료',
          html: `
          글이 사라졌어요!
          `,
          showConfirmButton: false,
          timer: 1000
        })
        if(typeof id === 'string'){
          dbFunc.removeArticle(id)
        }
        navigate('/secretboard')
      }else{
        return
      }
    })

  }

  return (
    <SecretBoardContainer>
      <EditorContainer onSubmit={handleSubmit}>
        <SecretBoardBtnContainer>
          <Btn><input type="checkbox" id="check" checked={secret} onChange={(e) => setSecret(e.target.checked)}/><label htmlFor="check"><p className="checkText">비공개 유무</p></label></Btn>
          <Btn><Link to="/secretboard"><p>취소</p></Link></Btn>
          {id !== '0' ? <Btn onClick={handleDelete}><p>삭제</p></Btn> : null}
          <Btn><button><p>완료</p></button></Btn>
        </SecretBoardBtnContainer>
        <p className="notice">비공개에 체크할 경우 일반회원은 이 글을 볼 수 없으며 작성자와 운영진만 볼 수 있습니다.
        <br />신고, 건의사항, 고민상담 등 비밀유지가 필요할 때 사용하세요!</p>

        <input type="text" className="titleArea" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="제목을 입력해주세요."/>
        <textarea className="contentArea" value={content} onChange={(e) => setContent(e.target.value)} placeholder="내용을 입력해주세요."/>
      </EditorContainer>


    </SecretBoardContainer>
  )
}

export default SecretBoardWrite