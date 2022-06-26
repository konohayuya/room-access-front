
export type StateType =  'login' | 'lecture' | 'in-campus'| 'be-out' | 'in-home'

export class PersonLog {
  name: string
  state: StateType
  option: string
  time: Date

  constructor(name: string, state: StateType, option: string, time: string) {
    this.name = name
    this.state = state
    this.option = option
    this.time = new Date(time)
  }
}

export type PersonState = {
  name: string
  state: StateType
}

export type FelicaDatum = {
  idm: string
  name: string
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


