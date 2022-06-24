
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

export class BusDeparture {
  time: Date
  type: string

  constructor(time: string, type: string) {
    const [hour, minutes] = time.split(":")
    const d = new Date()
    d.setHours(parseInt(hour))
    d.setMinutes(parseInt(minutes))
    d.setSeconds(0, 0)
    this.time = d
    this.type = type
  }
}


