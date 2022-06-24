
export type StateType =  'login' | 'lecture' | 'in-campus'| 'be-out' | 'in-home'

export type PersonLog = {
  name: string
  state: StateType
  option: string
  time: string
}

export type PersonState = {
  name: string
  state: StateType
}

