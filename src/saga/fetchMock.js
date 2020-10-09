import fetch from 'node-fetch'
import { dataSource } from '../utils/endpoints'

export const fetchData = async () => {
  const response = await fetch(dataSource)
  const json = await response.json()
  return json
}
