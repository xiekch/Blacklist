let existed = `
127.0.0.1 localhost 
`
let append = new Set()

function addNewSites() {
    let elements = []
    // google
    for (let e of document.getElementsByClassName('qLRx3b')) {
        elements.push(e.firstChild.textContent)

    }
    for (let e of document.getElementsByClassName('siteLink_9TPP3')) {
        elements.push(e.href)
    }

    // baidu
    for (let e of document.getElementsByClassName('c-color-gray')) {
        let url = e.innerText
        if (!url.startsWith('http')) {
            url = 'http://' + url
        }
        elements.push(url)
    }


    // sogou
    for (let e of document.getElementsByClassName('citeurl')) {
        let url = e.firstChild.textContent
        if (url.indexOf('.') >= 0) {
            if (!url.startsWith('http')) {
                url = 'http://' + url
            }
            elements.push(url)
        }
    }

    // for (let e of document.getElementsByTagName('cite')) {
    //     let url = e.innerText
    //     if (!url.startsWith('http')) {
    //         url = 'http://' + url
    //     }
    //     elements.push(url)
    // }

    for (let ele of elements) {
        try {
            let host = new URL(ele).host;
            if (existed.indexOf(host) == -1 && host.includes('.')) {
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

//addNewSites()

let times = 0
let visitedPages = []
function iteratePageForBaidu() {
    if (times > 40) {
        return
    }
    addNewSites()
    let pages = $('#page')[0].getElementsByTagName('a')
    let nextPage = pages[pages.length - 1]
    let pageNum = nextPage.href.match(/pn=(\d+)/)[1]
    if (nextPage && !visitedPages.includes(pageNum)) {
        nextPage.click()
        visitedPages.push(pageNum)
    } else {
        return
    }
    setTimeout(() => {
        iteratePageForBaidu()
        times++
    }, 6000)
}


function iteratePageForGoogle($) {
    if (times > 16) {
        return
    }
    addNewSites()
    let next = $('.GNJvt')
    if (next != null) {
        next.click()
    } else {
        return
    }
    setTimeout(() => {
        iteratePageForGoogle($)
        times++
    }, 1000)
}


function iteratePageForSogou() {
    if (times > 40) {
        return
    }
    addNewSites()
    let nextPage = $('#sogou_next')[0]
    if (nextPage) {
        nextPage.click()
    } else {
        return
    }
    setTimeout(() => {
        iteratePageForSogou()
        times++
    }, 5000)
}

let curDomain = document.domain
if (curDomain.indexOf('baidu') >= 0) {
    console.log('baidu')
    iteratePageForBaidu()
} else if (curDomain.indexOf('google') >= 0) {
    console.log('google')
    iteratePageForGoogle($)
} else if (curDomain.indexOf('sogou') >= 0) {
    console.log('sogou')
    iteratePageForSogou()
}
