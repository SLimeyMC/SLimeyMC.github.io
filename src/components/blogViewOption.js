import Alpine from 'alpinejs'
import persist from '@alpinejs/persist'

Alpine.plugin(persist)

Alpine.store('isComfy', {
    on: Alpine.$persist(true).as('isComfy'),
    toggle() {
        this.on = !this.on
    }
});
Alpine.store('lineHeight', {
    at: Alpine.$persist(1.5).as('lineHeight'),
    increment() {
        this.at += 0.5
    },
    decrement() {
        this.at -= 0.5
    },
    default() {
        this.at = 1.5
    }
});
Alpine.start()