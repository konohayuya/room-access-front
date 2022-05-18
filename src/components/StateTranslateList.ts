// 入室状況のログのtranslate用の対応表
const StateTableHeaderDict: {[key: string]: string} = {name: '名前', state:'状態', option:'備考', time: '時間'}

// 入室状況のボタンのtranslate用の対応表
const StateTypeDict = {login: '入室', lecture: '講義', 'in-campus': '学内', 'be-out': '外出', 'in-home': '帰宅'}

export {StateTableHeaderDict, StateTypeDict}
