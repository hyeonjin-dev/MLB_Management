import { PrizeListContainer } from "../../style/memberFeeStyled"
import { useAppSelector } from "../../store/hook.ts"
import { dateCalc } from "../../lib/dateCalc.ts"
import { useState, useEffect } from "react"
import { hasPrize } from "../../lib/hasPrize.ts"
import type { Member } from "../../store/slice.ts"
import { GiClover, GiLoveSong } from "react-icons/gi";

const PrizeList = () => {
  const { membersData, meetData } = useAppSelector(state => state.membersData)
  const [ prizeFirst, setPrizeFirst ] = useState<Member[]>()
  const [ prizeSing, setPrizeSing ] = useState<string[]>([])

  useEffect(() => {
    const first = membersData.filter((member) => hasPrize.first(member[1])).map((member) => member[1])
    setPrizeFirst(first)
    setPrizeSing(hasPrize.sing(meetData))
  }, [])

  return (
    <>
    {((prizeFirst && prizeFirst.length > 0 ) || (prizeSing && prizeSing.length > 0)) &&
        <PrizeListContainer>
        <p>{dateCalc('month')}월 상금 대상자</p>
        {prizeFirst?.map((member, i) => (
          <div className="member" key={i}>
            <span className="title">
              첫 벙 지원금
              <GiClover />
            </span>
            <span>{member.name}</span>
          </div>
        ))
        }
        {prizeSing?.map((member, i) => (
          <div className="member" key={i}>
            <span className="title">
              노래벙 지원금
              <GiLoveSong />
            </span>
            <span>{member}</span>
          </div>
        ))}
      </PrizeListContainer>
    }
    </>
  )
}

export default PrizeList