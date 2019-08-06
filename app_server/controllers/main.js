module.exports.index = function(reg, res , next){
    res.render('index',{title: 'Index'});
};

module.exports.spa = function (req, res) {
    res.render('layout-spa', { title: 'SPA Angular' });
};