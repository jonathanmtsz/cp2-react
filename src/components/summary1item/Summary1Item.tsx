import { SummaryDetails, SummaryImage, SummaryTitle, SummaryDescription, SummaryPrice } from "../../pages/summary/Summary.style"
import { convertToCurrency } from "../../helpers/convertToCurrency"


export const Summary1Item = ({summaryData}) => {
return( 
    <>
    <SummaryDetails>
        <SummaryImage src={summaryData.image} alt="" />
        <SummaryTitle>{summaryData.name}</SummaryTitle>
        <SummaryDescription>
        {summaryData.text} {`(${summaryData.slices}) pedaços`}
        </SummaryDescription>
        <SummaryPrice>{convertToCurrency(summaryData.price)}</SummaryPrice>
    </SummaryDetails>
</>
    )
}