import { createContext, useState } from "react"

type PizzaSizeType = {
  id: string
  flavours: number
  size: number
  slices: number
  text: string
}

type SaboresType = {
  flavors : Array<object>
}

type PizzaFlavourType = {
  id: string
  image: string
  name: string
  description: string
  price: {
    "8": number
    "4": number
    "1": number
  }
}

type PizzaOrderType = {
  item: {
    name: string
/*name = flavor*/ 
    image: string
    size: string
    slices: number
    value: number
  }
  total: number
}

type OrderContextProps = {
  pizzaSize: PizzaSizeType
  setPizzaSize: React.Dispatch<React.SetStateAction<PizzaSizeType>>
  pizzaFlavour: PizzaFlavourType
  setPizzaFlavour: React.Dispatch<React.SetStateAction<PizzaFlavourType>>
  pizzaOrder: PizzaOrderType
  setPizzaOrder: React.Dispatch<React.SetStateAction<PizzaOrderType>>
  sabores: SaboresType
  setSabores: React.Dispatch<React.SetStateAction<SaboresType>>
}

const OrderContext = createContext<OrderContextProps>({})

const OrderContextProvider = ({ children }) => {
  const [pizzaSize, setPizzaSize] = useState()
  const [pizzaFlavour, setPizzaFlavour] = useState()
  const [pizzaOrder, setPizzaOrder] = useState()
  const [sabores, setSabores] = useState()

  return (
    <OrderContext.Provider
      value={{
        pizzaSize,
        setPizzaSize,
        pizzaFlavour,
        setPizzaFlavour,
        pizzaOrder,
        setPizzaOrder,
        sabores,
        setSabores
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}

export { OrderContextProvider }
export default OrderContext
