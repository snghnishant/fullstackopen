const dummy = (blogs) => {
    return 1;
};

const totalLikes = (blogList) => {
    let sum = 0;
    blogList.forEach(el => sum+= el.likes);
    return sum;
};

module.exports = {
    dummy,
    totalLikes
};