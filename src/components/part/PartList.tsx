import { useAppSelector, useAppDispatch } from "../../store/hook.ts"
import { StyledFaCrown, StyledFaStar } from "../../style/homeStyled.tsx"
import { sortState } from "../../store/slice.ts"
import { DangerText, PartListContainer, SearchBarPart, TagExplain } from "../../style/partPageStyled.tsx"
import { dateCalc } from "../../lib/dateCalc.ts"
import { totalCalcFunc } from "../../lib/totalCalcFunc.ts"
import { togglePartModal, sendMember } from "../../store/slice.ts"
import { useState } from "react"
import GraphArrow from "../common/GraphArrow.tsx"
import { averCheck } from "../../lib/averCheck.ts"
import { newFaceCheck } from "../../lib/newFaceCheck.ts"
import { oldFaceCheck } from "../../lib/oldFaceCheck.ts"
import { hotCount } from "../../lib/hotCount.ts"

const PartList = () => {
  const { membersData, loginUser, yearView, monthView } = useAppSelector(state => state.membersData)

  //휴식기 & 가입대기 제외
  const totalMember = membersData.filter(member => !member[1].break && member[1].join)
  const dispatch = useAppDispatch()

  const [ search, setSearch ] = useState('')

  const searchMembersData = totalMember.filter(member => member[1].name.includes(search))

  const date = new Date()
  const currentYear = date.getFullYear()
  const currentMonth = date.getMonth() + 1

  return (
    <>
    <SearchBarPart onSubmit={(e: React.FormEvent) => e.preventDefault()}>
      <input type="search" onChange={(e) => setSearch(e.target.value)} placeholder="이름을 검색해주세요."/>
    </SearchBarPart>
    <GraphArrow isMonth={true}/>
    <TagExplain>
      <span className="exp">
        <StyledFaCrown bgColor='#ffac4c' />
        모임장
      </span>
      <span className="exp">
        <StyledFaStar bgColor='#fc7b7b' />
        운영진
      </span>
      <span className="exp">
        <span className="tagHot">Hot</span>
        최근 참석 상위권 (지난 3개월 기준)
      </span>
    </TagExplain>
    <PartListContainer>
      <table>
        <thead>
          <tr>
            <th onClick={() => {dispatch(sortState('name'))}}>정렬 | 이름</th>
            <th className="index">순번</th>
            <th onClick={() => {dispatch(sortState('monthPart'))}}>{monthView}월 참석</th>
            <th onClick={() => {dispatch(sortState('aver'))}}>평균 참석</th>
          </tr>
        </thead>
        <tbody>
        {searchMembersData.map((member, i) => {
          let memberJoin = new Date(member[1].join)
          let memberCome: Date | null = member[1].comeback ? new Date(member[1].comeback) : null
          let joinMonth = memberJoin.getMonth() + 1
          let joinYear = memberJoin.getFullYear()
          let comeMonth = memberCome ? memberCome?.getMonth() + 1 : 0
          let comeYear = memberCome ? memberCome?.getFullYear() || 0 : 0

          let yearData: any = null

          if(member[1] && (member[1] as any).attend) {
              yearData = (member[1] as any).attend[yearView] || {}
          }

          return (
          loginUser.level >= 2 && member[1].danger ?
          <DangerText key={i} onClick={() => {dispatch(togglePartModal()), dispatch(sendMember({id: member[0]}))}}>
            <td>{member[1].special === '모임장' ?
                <StyledFaCrown bgColor='#ffac4c' /> : 
                member[1].special === '운영진' ? 
                <StyledFaStar bgColor='#fc7b7b' /> : null
                
              }{member[1].name}
              <div className="tagContainer">
                <span className="tagDanger">위험!</span>
              {//신입태그
                newFaceCheck(joinYear, joinMonth) ? <span className="tagNew">신입</span> : null
              }</div></td>
            <td className="index">{i+1}</td>
            <td>{
            yearData ? yearData[monthView] || 0 : 0
            } 회</td>
            {/* <td>{totalCalcFunc(member[1], yearView).aver} 회</td> */}
            <td>{averCheck(member[1], yearView)} 회</td>
          </DangerText>

          :

          <tr key={i} onClick={() => {dispatch(togglePartModal()), dispatch(sendMember({id: member[0]}))}}>
            <td>{member[1].special === '모임장' ?
                <StyledFaCrown bgColor='#ffac4c' /> : 
                member[1].special === '운영진' ? 
                <StyledFaStar bgColor='#fc7b7b' /> : null}
              {member[1].name}
              <div className="tagContainer">
              {
                //신입태그
                newFaceCheck(joinYear, joinMonth) ? <span className="tagNew">신입</span> : null
              }{
                oldFaceCheck(comeYear, comeMonth, currentYear, currentMonth) ? 
                <span className="tagBack">복귀</span> :
                null
              }
              {hotCount(member[1]) >= 15 ?
               <span className="tagHot">Hot</span> : null}
              </div>
            </td>
            <td className="index">{i+1}</td>
            <td>{
            yearData ? yearData[monthView] || 0 : 0
            } 회</td>
            <td>{totalCalcFunc(member[1], yearView).aver} 회</td>
            {/* <td>{averCheck(member[1], yearView)} 회</td> */}
          </tr>
        )})}
        </tbody>
      </table>
    </PartListContainer>
    </>
  )
}

export default PartList