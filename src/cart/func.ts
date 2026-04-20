export type Product = {
  name: string
  price: number
  quantity: number
}

export const calculateTotal = (products: Product[]): number => {
  return products.reduce((total, product) => {
    return total + product.price * product.quantity
  }, 0)
}