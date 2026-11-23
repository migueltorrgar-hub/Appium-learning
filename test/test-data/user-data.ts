export const USERS = {
    standard: 'standard_user',
    lockedOut: 'locked_out_user',
    problem: 'problem_user',
    performanceGlitch: 'performance_glitch_user',
};

export const PASSWORD = 'secret_sauce';

export const createUser = (userKey: keyof typeof USERS) => {
    return {
        username: USERS[userKey],
        password: PASSWORD,
    };
};