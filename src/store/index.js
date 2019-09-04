import Vue from 'vue'
import Vuex from 'vuex'
import global from './modules/global.js'
import schedule from './modules/schedule.js'
import scheduleForm from './modules/schedule-form.js'
import schedulesForm from './modules/schedules-form.js'
import courseForm from './modules/course-form.js'
import roomForm from './modules/room-form.js'


Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        global,
        schedule,
        scheduleForm,
        schedulesForm,
        courseForm,
        roomForm
    },
    strict: debug,
    // mutations: {
    //     updateVal(state, name) {
    //         state.global.name = name;
    //     }
    // }
})
