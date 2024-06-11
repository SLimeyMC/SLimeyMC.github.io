import Alpine from 'alpinejs'
import persist from '@alpinejs/persist'

Alpine.store('isComfy', {
    on: Alpine.$persist(true).as('isComfy'),
    toggle() {
        this.on = !this.on
    }
});
Alpine.store('lineHeight', {
    at: Alpine.$persist(1.5).as('lineHeight'),
    increment() {
        this.at += 0.1
        this.at = Math.min(this.at, 3.0)
    },
    decrement() {
        this.at -= 0.1
        this.at = Math.max(this.at, 0.0)
    },
    default() {
        this.at = 1.5
    }
});
Alpine.store('mastodonInstance', Alpine.$persist(''));