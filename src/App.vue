<template>
    <div>
        <div class="btn-group-vertical w-100 mt-2 mb-2 p-2">
            <button v-for="btn in directions"
                    class="btn btn-lg"
                    :class="{'btn-primary': currentDirection == btn,
                             'flash': illuminateTimeout && currentDirection == btn,
                            'btn-secondary': currentDirection != btn
                    }"
                    @click="setDirection(btn)">
                {{ btn }}
            </button>
        </div>

        <button @click="clearDirection"
                class="btn btn-sm btn-danger mx-auto d-block">
            Clear Direction
        </button>
    </div>
</template>
<style>
.btn-group-vertical button:nth-child(n+1) {
    border-top: 3px solid #333;
}

.flash {
    background: red;
    animation: blinkButton 1s infinite;
}

@keyframes blinkButton {
    0% {
        background: darkred;
    }

    50% {
        background: red;
    }

    100% {
        background: darkred;
    }
}

</style>
<script>
import {
    toRaw
} from 'vue';

import {
    getDatabase, 
    ref,
    set, 
    get,
    child,
    push,
    remove,
    onValue, 
    onChildAdded, 
    onChildChanged, 
    onChildRemoved,
    orderByKey,
    query,
    update
} from "firebase/database";

export default {

    methods: {
        setDirection(direction) {
            const database = getDatabase();
            set(ref(database, 'direction'), direction);            
        },

        clearDirection() {
            const database = getDatabase();
            remove(ref(database, 'direction'));    
            
            if(this.illuminateTimeout) {
                clearTimeout(this.illuminateTimeout);
                this.illuminateTimeout = null;
            }
        },


        async build() {
            const db = getDatabase();

            onValue(ref(db, 'direction'), (snapshot) => {
                this.currentDirection = snapshot.val();
                
                if(this.illuminateTimeout) {
                    clearTimeout(this.illuminateTimeout);
                }
                this.illuminateTimeout = setTimeout(this.clearIlluminate, 10000);
            });
        },

        clearIlluminate() {
            this.illuminateTimeout = null;
        }
    },

    data() {
        return {
            illuminateTimeout: null,
            currentDirection: null,
            directions: [
                "Bring Julius Up NOW",
                "Julius",
                "Julius + Slides/Content",
                "Julius + Guest",
                "Guest",
                "Guest + Slides/Content",
                "Julius + Guest + Slides/Content",
                "Take guest off screen",
            ]
        }
    },

    mounted() {
        this.build();
    }
}
</script>