let existed = `
127.0.0.1 localhost 
`
let append = new Set()

function addNewSites() {
    let elements = []
    for (let e of document.getElementsByClassName('qLRx3b')) {
        elements.push(e.firstChild.textContent)

    }
    for (let e of document.getElementsByClassName('siteLink_9TPP3')) {
        elements.push(e.href)
    }
    // for (let e of document.getElementsByClassName('c-color-gray')) {
    //     elements.push(e.innerText)
    // }
    for (let ele of elements) {
        try {
            let host = new URL(ele).host;
            if (existed.indexOf(host) == -1) {
                append.add(host);
            }
        } catch (e) {
            console.log(e, ele)
        }
    }
    console.log(append)

    let res = ''
    for (let t of append) {
        res += '127.0.0.1 ' + t + '\n'
    }
    // existed += res
    console.log(res)
}

addNewSites()
