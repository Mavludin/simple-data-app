import { putData, LOAD_DATA } from '../store/actions'
import { takeEvery, put, call } from 'redux-saga/effects'
import { dataSource } from './../utils/endpoints'

export const fetchData = async () => {
  const response = await fetch(dataSource)
  const json = await response.json()
  return json
}

function * workerLoadData () {
  const data = yield call(fetchData)
  yield put(putData(data))
}

export function * watchLoadData () {
  yield takeEvery(LOAD_DATA, workerLoadData)
}
