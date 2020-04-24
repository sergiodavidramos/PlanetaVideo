import gravatar from '../gravatar';

describe('Gravatar function', ()=>{
    it('should return gravatar default url', ()=>{
        const email = 'd@vid.com';
        const gravatarDefaultImage = 'https://gravatar.com/avatar/96eb9ddc22a09a6c847698b2b1129a5b';
        expect(gravatarDefaultImage).toEqual(gravatar(email));
    })
})