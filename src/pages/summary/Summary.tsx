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

  const { pizzaSize, pizzaFlavour, pizzaOrder, sabores, orders, setOrders ,setPizzaOrder, setPizzaFlavour} = useContext(OrderContext)
  const [summaryData, setSummaryData] = useState({})
  const [summaryAmount, setSummaryAmount] = useState(0)
  const [OrderList, setOrderList] = useState([])

  const payloadCreator = () => {
    let payload = {}
    if(sabores.length == 1){
      payload = {
        item: {
          name: summaryData.name,
          image: summaryData.image,
          size: summaryData.slices,
          slices: summaryData.slices,
          value: summaryData.price,
        },
        total: summaryData.price,
      }
    }
    if(sabores.length == 2){
       let name = sabores[0].name
       let name2 = sabores[1].name
        let nomeConcated = name + " / " +name2
        console.log(nomeConcated)
        payload = {
          item: {
            name: nomeConcated,
            image: summaryData.image,
            size: summaryData.slices,
            slices: summaryData.slices,
            value: summaryData.price,
          },
          total: summaryData.price,
        }
      }
      return payload
  }

  const handleBack = () => {
    navigate(routes.pizzaFlavour)
  }

  const handleAdd = () => {
    setOrders([...OrderList])
    navigate(routes.pizzaSize)
  }

  const handleNext = () => {
    setOrders([...OrderList])
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
  
  useEffect(() =>{

    if(Object.keys(summaryData).length != 0){
    let payloaded = payloadCreator()
    console.log("1 - payload é:")
    console.log(payloaded)
    if(payloaded) {
      setPizzaOrder(payloaded)
    }
  }
  },[summaryData])

  useEffect(() =>{
    if(pizzaOrder){
    console.log("2 -")
    setOrderList([...OrderList, pizzaOrder])
    console.log("pizzaOrder é: ")
    console.log(pizzaOrder)
    }
  },[pizzaOrder])

  useEffect(() => {
    console.log("OrderList é:")
    console.log(OrderList)
    //console.log(orders[0].item['name'])
  }, [OrderList])

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
      <Button onClick={handleAdd}> Adicionar outra pizza </Button>
      <Button onClick={handleNext}>Ir para o pagamento</Button>
    </SummaryActionWrapper>
  </Layout>
  )
}
