import {routeMaker} from "../common/utils";

describe('util', () => {

    describe('routeMaker', () => {

        it('should build a correct collection route', () => {
            const route = routeMaker('user');

            const userIndex = route.collection('');
            expect(userIndex).toBe('/user');

            const userLogin = route.collection('/login');
            expect(userLogin).toBe('/user/login');
        });

        it('should build a correct single route', () => {
            const route = routeMaker('user');

            const userInfo = route.single('');
            expect(userInfo).toBe('/user/:userId');

            const userPosts = route.single('/posts');
            expect(userPosts).toBe('/user/:userId/posts');
        });
    })

});
