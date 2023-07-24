function NeteaseMusic() {
    this.init()
}

NeteaseMusic.prototype = {
    init() {
        this.bindEvent()
    },
    bindEvent() {
        let nowIndex = [0, 1, 2, 3]
        const directionNames = ['toBack', 'toLeft', 'toFront', 'toRight']
        function moveForward(reverse) {
            for (let i = 0; i < 4; i++) {
                if (reverse) {
                    nowIndex[i] = nowIndex[i] - 1 >= 0 ? nowIndex[i] - 1 : 8
                    let index = nowIndex[i]
                    $('.pic').eq(index).attr('class', `pic ${directionNames[(i + 1) % 4] ?? ''}`)
                } else {
                    let index = nowIndex[i]
                    $('.pic').eq(index).attr('class', `pic ${directionNames[i] ?? ''}`)
                    nowIndex[i] = (nowIndex[i] + 1) % 9
                }
                $('.dotGuide .dot').removeClass('current')
                $('.dotGuide .dot').eq($('.toFront').index()).addClass('current')
            }
        }

        $('.carousel .prev').click(() => moveForward(true))
        $('.carousel .next').click(() => moveForward())
        $('.dotGuide .dot').hover(e => {
            if (e.target.classList.contains('current')) return
            let steps = Math.abs($('.dotGuide .current').index() - $(e.target).index())
            let reverse = $('.dotGuide .current').index() - $(e.target).index() > 0
            if (reverse && steps > 4) {
                reverse = false
                steps = 9 - steps
            }
            for (let i = 0; i < steps; i++) {
                moveForward(reverse)
            }
            
        })
        $('.carousel').hover(e => {
            $('.carousel .prev, .carousel .next').css('display', 'flex')
        }, e => {
            $('.carousel .prev, .carousel .next').fadeOut(260)
        })
    }
}

$(() => {
    new NeteaseMusic()
})