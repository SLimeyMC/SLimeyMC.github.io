export default function (Alpine) {
    Alpine.directive('reveal', reveal)

    // If we're using a "minimum height", we'll need to disable
    // x-show's default behavior of setting display: 'none'.
    reveal.inline = (el, { modifiers }) => {
        if (! modifiers.includes('min-y')) return

        el._x_doShow = () => {}
        el._x_doHide = () => {}
    }

    function reveal(el, { modifiers }) {
        let duration = modifierValue(modifiers, 'duration', 1000) / 1000
        let floor = modifierValue(modifiers, 'min-y', 0)
        let wall = modifierValue(modifiers, 'min-x', 0)
        let fullyHide = ! modifiers.includes('min')

        if (! el._x_isShown) el.style.height = `${floor}px`
        if (! el._x_isShown) el.style.height = `${wall}px`
        // We use the hidden attribute for the benefit of Tailwind
        // users as the .space utility will ignore [hidden] elements.
        // We also use display:none as the hidden attribute has very
        // low CSS specificity and could be accidentally overridden
        // by a user.
        if (! el._x_isShown && fullyHide) el.hidden = true
        if (! el._x_isShown) el.style.overflow = 'hidden'

        // Override the setStyles function with one that won't
        // revert updates to the height style.
        let setFunction = (el, styles) => {
            let revertFunction = Alpine.setStyles(el, styles);

            return styles.height ? () => {} : revertFunction
        }

        let transitionStyles = {
            transitionProperty: 'height, width',
            transitionDuration: `${duration}s`,
            transitionTimingFunction: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
        }

        el._x_transition = {
            in(before = () => {}, after = () => {}) {
                if (fullyHide) el.hidden = false;
                if (fullyHide) el.style.display = null

                let currentWidth = el.getBoundingClientRect().width
                let currentHeight = el.getBoundingClientRect().height

                el.style.height = 'auto'
                el.style.width = 'auto'

                let fullWidth = el.getBoundingClientRect().width
                let fullHeight = el.getBoundingClientRect().height

                if (currentHeight === fullHeight) { currentHeight = floor }
                if (currentWidth === fullHeight) { currentWidth = wall }

                Alpine.transition(el, Alpine.setStyles, {
                    during: transitionStyles,
                    start: { height: currentHeight+'px', width: currentWidth+'px' },
                    end: { height: fullHeight+'px', width: fullWidth+'px'  },
                }, () => el._x_isShown = true, () => {
                    if (Math.abs(el.getBoundingClientRect().height - fullHeight) < 1 &&
                        Math.abs(el.getBoundingClientRect().width - fullWidth) < 1) {
                        el.style.overflow = null
                    }
                })
            },

            out(before = () => {}, after = () => {}) {
                let fullHeight = el.getBoundingClientRect().height
                let fullWidth = el.getBoundingClientRect().width

                Alpine.transition(el, setFunction, {
                    during: transitionStyles,
                    start: { height: fullHeight+'px', width: fullWidth+'px' },
                    end: { height: floor+'px', width: wall+'px' },
                }, () => el.style.overflow = 'hidden', () => {
                    el._x_isShown = false

                    // check if element is fully collapsed
                    if (el.style.height == `${floor}px` && el.style.width == `${wall}px` && fullyHide) {
                        el.style.display = 'none'
                        el.hidden = true
                    }
                })
            },
        }
    }
}

function modifierValue(modifiers, key, fallback) {
    // If the modifier isn't present, use the default.
    if (modifiers.indexOf(key) === -1) return fallback

    // If it IS present, grab the value after it: x-show.transition.duration.500ms
    const rawValue = modifiers[modifiers.indexOf(key) + 1]

    if (! rawValue) return fallback

    if (key === 'duration') {
        // Support x-collapse.duration.500ms && duration.500
        let match = rawValue.match(/([0-9]+)ms/)
        if (match) return match[1]
    }

    if (key === 'min') {
        // Support x-collapse.min.100px && min.100
        let match = rawValue.match(/([0-9]+)px/)
        if (match) return match[1]
    }

    return rawValue
}
