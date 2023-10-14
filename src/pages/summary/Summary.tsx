import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Layout } from "../../components/layout/Layout"
import { routes } from "../../routes"
import OrderContext from "../../contexts/OrderContext"
import { Title } from "../../components/title/Title"
import { convertToCurrency } from "../../helpers/convertToCurrency"
import {
  SummaryActionWrapper,
  SummaryAmount,
  SummaryContentWrapper,
  SummaryDescription,
  SummaryDetails,
  SummaryImage,
  SummaryPrice,
  SummaryTitle,
} from "./Summary.style"
import { Button } from "../../components/button/Button"
import { Summary2Itens } from "../../components/summary2itens/Summary2Itens"
import { Summary1Item } from "../../components/summary1item/Summary1Item"

export default function Summary() {
  const navigate = useNavigate()

  const { pizzaSize, pizzaFlavour, sabores, setPizzaOrder, setPizzaFlavour} = useContext(OrderContext)
  const [summaryData, setSummaryData] = useState({})
  const [summaryAmount, setSummaryAmount] = useState(0)

  const handleBack = () => {
    navigate(routes.pizzaFlavour)
  }
  const handleNext = () => {
    const payload = {
      item: {
        name: summaryData.name,
        image: summaryData.image,
        size: summaryData.text,
        slices: summaryData.slices,
        value: summaryData.price,
      },
      total: summaryAmount,
    }

    setPizzaOrder(payload)
    navigate(routes.checkout)
  }

  useEffect(() => {
    if (!pizzaFlavour) {
      return navigate(routes.pizzaSize)
    }

    if (!pizzaSize) {
      return navigate(routes.home)
    }

    if(sabores.length == 1){
      console.log(pizzaFlavour)
      let ok = ""
      ok = (pizzaSize[0].slices)
      ok = ok.toString()
      setSummaryData({
        text: sabores[0].description,
        slices: pizzaSize[0].slices,
        name: sabores[0].name,
        price: pizzaFlavour.price[ok],
        image: sabores[0].image
      })
    }
    
    if(sabores.length == 2){
      let ok = ""
      ok = (pizzaSize[0].slices)
      ok = ok.toString()
      setSummaryData({
        text: sabores[0].description,
        text2:sabores[1].description,
        slices: pizzaSize[0].slices,
        name: sabores[0].name,
        name2: sabores[1].name,
        price: pizzaFlavour.price[ok],
        image: sabores[0].image,
        image2: sabores[1].image
      })
    console.log(sabores)
    }
    
  }, [])

  useEffect(() => {
    setSummaryAmount(summaryData.price)
  }, [summaryAmount])

  

  return (
    <Layout>
    <Title tabIndex={0}>Resumo do pedido</Title>
    <SummaryContentWrapper>
      {sabores.length === 2 ? (
        <Summary2Itens summaryData={summaryData} />
      ) : (
        <Summary1Item summaryData={summaryData}/>
      )}
    </SummaryContentWrapper>
    <SummaryActionWrapper>
      <Button inverse="inverse" onClick={handleBack}>
        Voltar
      </Button>
      <Button onClick={handleNext}>Ir para o pagamento</Button>
    </SummaryActionWrapper>
  </Layout>
  )
}
