import * as constants from './giveTime.actionTypes.js'

export default function (state = { giveTimeDialog: {
    openId: null,
} }, action) {
    switch (action.type) {
    case constants.GIVE_TIME_DIALOG_OPEN:
        return Object.assign({}, state, {
            giveTimeDialog: Object.assign({}, state.giveTimeDialog, {
                openId: action.id,
                userCredit: state.user.credit,
                amount: state.projects.reduce((agg, project) => {
                    return project.id === action.id ? Math.min(agg, project.estimate - project.acquired) : agg
                }, state.user.credit),
            }),
        })
    case constants.GIVE_TIME_DIALOG_CLOSE:
        return Object.assign({}, state, {
            giveTimeDialog: Object.assign({}, state.giveTimeDialog, { openId: null, projectId: null }),
        })
    case constants.GIVE_TIME:
        return Object.assign({}, state, {
            projects: state.projects.map(
                (project) => project.id === action.id
                    ? Object.assign({}, project, { acquired: project.acquired + action.amount })
                    : project
            ),
            user: Object.assign({}, state.user, { credit: state.user.credit - action.amount }),
        })
    default:
        return state
    }
}