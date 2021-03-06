import FSM from 'rexPlugins/fsm.js';

class State extends FSM {
    constructor(parent, config) {
        super(config);
        this.parent = parent;
        this.init();
    }

    init() {
        this.start('IDLE');
    }

    // IDLE -> DRAG
    next_IDLE() {
        var nextState,
            parent = this.parent,
            dragState = parent.dragState;
        if (dragState.isDown) {
            nextState = 'DRAG';
        }
        return nextState;
    }
    update_IDLE(time, delta) {
        this.next();
    }
    // IDLE    

    // DRAG -> BACK|SLIDE|IDLE
    next_DRAG() {
        var nextState,
            parent = this.parent,
            dragState = parent.dragState;
        if (dragState.isUp) {
            if (parent.outOfBounds) {
                nextState = 'BACK';
            } else if (parent.slidingEnable) {
                nextState = 'SLIDE';
            } else {
                nextState = 'IDLE';
            }
        }
        return nextState;
    }
    update_DRAG(time, delta) {
        var parent = this.parent,
            dragState = parent.dragState;
        if (dragState.justMoved) {
            parent.dragging();
        }
        this.next();
    }
    // DRAG    

    // SLIDE -> DRAG|IDLE
    next_SLIDE() {
        var nextState,
            parent = this.parent,
            dragState = parent.dragState;
        if (dragState.isDown) {
            nextState = 'DRAG';
        } else if (!parent.isSliding) {
            nextState = 'IDLE';
        }
        return nextState;
    }
    enter_SLIDE() {
        this.parent.onSliding();
    }
    exit_SLIDE() {
        this.parent.stop();
    }
    update_SLIDE(time, delta) {
        this.parent.sliding(time, delta);
        this.next();
    }
    // SLIDE    

    // BACK -> DRAG|IDLE
    next_BACK() {
        var nextState,
            parent = this.parent,
            dragState = parent.dragState;
        if (dragState.isDown) {
            nextState = 'DRAG';
        } else if (!parent.isPullBack) {
            nextState = 'IDLE';
        }
        return nextState;
    }
    enter_BACK() {
        this.parent.onPullBack();
    }
    exit_BACK() {
        this.parent.stop();
    }
    update_BACK(time, delta) {
        this.parent.pullBack(time, delta);
        this.next();
    }
    // BACK
}

export default State;