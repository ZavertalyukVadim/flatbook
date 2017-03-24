export const TEST = 'test';

export default store => next => action => {
    const testAction = action[TEST];
    if (typeof testAction === 'undefined') {
        return next(action);
    }

    const [requestType, successType, failureType] = testAction.types;
    const {user} = testAction;
    const defaultUser = {
        email: 'test',
        password: 'test'
    };

    const actionWith = data => {
        const finalAction = {...action, ...data};
        delete finalAction[TEST];
        return finalAction;
    };

    next(actionWith({type: requestType}));

    if (user.email === defaultUser.email && user.password === defaultUser.password) {
        return next(actionWith({type: successType}));
    } else {
        return next(actionWith({type: failureType, error: 'Your email or password is not correct'}));
    }
};
