import { userReducer } from "./user-reducer";

test('user reducer shouldincrement only age', () => {
    const startState ={age:20, childrenCount:2, name:'Misha'};
    const endState = userReducer(startState, { type:"INCREMENT-AGE" })
    expect(endState.age).toBe(21);
    expect(endState.childrenCount).toBe(2)
});

// test('user reducer shouldincrement only childdrenCount', () => {
//     const startState ={age:28, childrenCount:26, name:'Misha'};
// });