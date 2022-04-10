function $(selector) {
    return document.querySelector(selector)
}

function Particles(options) {
    const params = {
        direction: options.direction === false ? false : true,
        canvas:    options.canvas || '#particles',
        width:     options.width || window.innerWidth,
        height:    options.width || window.innerHeight,
        color:     options.color || '#2c3e50',
        speed:     options.speed || 30,
        dots:      options.dots || 100,
        rmin:      options.rmin || 2,
        rmax:      options.rmax || 7,
        bg:        options.bg || '#fff'
    }

    // Init
    const $canvas = $(params.canvas)
    const ctx = $canvas.getContext('2d')
    let startTime = new Date().getTime()
    let dots = []

    $canvas.width = window.innerWidth
    $canvas.height = window.innerHeight
    
    
    // Controllers
    function randomInteger(min, max) {
        return Math.floor(min + Math.random() * (max + 1 - min))
    }

    function generate() {
        dots.forEach(dot => {
            ctx.beginPath()
            ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2)
            ctx.fill()
        })
    }

    function clear() {
        ctx.fillStyle = params.bg
        ctx.fillRect(0, 0, $canvas.width, $canvas.height)
        ctx.fillStyle = params.color
    }

    function animation() {
        clear()
        let currTime = new Date().getTime()
        let progress = (currTime - startTime) / 1000 * params.speed
        dots.forEach(dot => {
            if (dot.d == 1) {
                if (dot.y > 0 + dot.r) {
                    x = dot.x
                    y = dot.y + progress * (-1)
                } else {
                    x = dot.x
                    y = dot.y + progress
                    dot.d = 5
                }
            }
            if (dot.d == 2) {
                if (dot.y > 0 + dot.r && dot.x < $canvas.width - dot.r) {
                    x = dot.x + progress
                    y = dot.y + progress * (-1)
                } else {
                    x = dot.x + progress
                    y = dot.y + progress
                    dot.d = (dot.y > 1 + dot.r) ? 8 : 4
                }
            }
            if (dot.d == 3) {
                if (dot.x < $canvas.width - dot.r) {
                    x = dot.x + progress
                    y = dot.y
                } else {
                    x = dot.x + progress * (-1)
                    y = dot.y
                    dot.d = 7
                }
            }
            if (dot.d == 4) {
                if (dot.y < $canvas.height - dot.r && dot.x < $canvas.width - dot.r) {
                    x = dot.x + progress
                    y = dot.y + progress
                } else {
                    x = dot.x + progress * (-1)
                    y = dot.y + progress
                    dot.d = (dot.y < $canvas.height - 1 - dot.r) ? 6 : 2
                }
                
            }
            if (dot.d == 5) {
                if (dot.y < $canvas.height - dot.r) {
                    x = dot.x
                    y = dot.y + progress
                } else {
                    x = dot.x
                    y = dot.y + progress * (-1)
                    dot.d = 1
                }
            }
            if (dot.d == 6) {
                if (dot.y  < $canvas.height - dot.r && dot.x > 0 + dot.r) {
                    x = dot.x + progress * (-1)
                    y = dot.y + progress
                } else {
                    x = dot.x + progress * (-1)
                    y = dot.y + progress * (-1)
                    dot.d = (dot.y < $canvas.height - 1 - dot.r) ? 4 : 8
                }
            }
            if (dot.d == 7) {
                if (dot.x > 0 + dot.r) {
                    x = dot.x + progress * (-1)
                    y = dot.y
                } else {
                    x = dot.x + progress
                    y = dot.y
                    dot.d = 3
                }
            }
            if (dot.d == 8) {
                if (dot.y > 0 + dot.r && dot.x > 0 + dot.r) {
                    x = dot.x + progress * (-1)
                    y = dot.y + progress * (-1)
                } else {
                    x = dot.x + progress
                    y = dot.y + progress * (-1)
                    dot.d = (dot.y > 1 + dot.r) ? 2 : 6
                }
            }
            dot.x = x
            dot.y = y
        })
        generate()
        startTime = new Date().getTime()

        if (params.direction) {
            const id = randomInteger(0, params.dots-1)
            dots[id]['d'] = randomInteger(1, 8)
        }

        requestAnimationFrame(animation)
    }

    // Actions
    clear()
    ctx.lineWidth = 10
    for (let i=0; i<params.dots; i++) {
        const r = randomInteger(params.rmin, params.rmax)
        dots.push({
            x: randomInteger(5 + r/2, $canvas.width - r/2 - 5),
            y: randomInteger(5 + r/2, $canvas.height - r/2 - 5),
            d: randomInteger(1, 8), // direction
            r
        })
    }
    generate()
    animation()
}