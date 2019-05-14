const superagent = require('superagent')
const render = document.getElementById('render')
const fs = require('fs')
let info

fs.readFile('./info.json', 'utf8', (err, data) => {
  if (err) alert(err)
  info = JSON.parse(data.toString())
  if ((!info.선생님정보.학년 || !info.선생님정보.반 || !info.선생님정보.성명) && document.location.href.endsWith('index.html')) {
    alert('선생님의 정보가 설정되지 않았습니다!\n메뉴에서 설정을 눌러 설정해 주세요')
  }
})

let rendering = setInterval(() => {
  let temp = ''
  superagent.get(info.database, (err, res) => {
    if (err) { alert(err) } else {
      render.innerHTML = res.body
    }
  })
}, 1000)

function to (from, to) {
  document.location.href = document.location.href.split(from).join(to)
}
