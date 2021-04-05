const inc = () => ({ type: 'INC' });
const dec = () => ({ type: 'DEC' });
const rnd = (payload) => ({ type: 'RND', payload });

export { inc, dec, rnd };
