// console.log(window.location);

let MON_SUPER_SITE = {};
let total = 0;
var products = [];

let addLogoutButton = function () {
    $('.logout').load('templates/partials/_logout.html');
}

let addLoginButton = function () {
    $('.login').html(`
        <a href="/#login" class="btn btn-success">Login</a>
    `);
}

let handleRequest = function () {
    let user = {};

    $('.logout').html('');
    $('.login').html('');

    $.get('security.php', function(response) {
        response = JSON.parse(response);

        if (response.user) {
            MON_SUPER_SITE['security'] = response.user;
            addLogoutButton();
        }
        
        if (!response.user) {
            addLoginButton();
        }

        let baseUrl = window.location.origin;
        let page = "";

        if (window.location.hash === "") {
            page = 'homepage';
        }

        if (window.location.hash !== "") {
            page = window.location.hash.split('#')[1];
        }

        if (!response.user && page !== 'login') {
            window.location.hash = '#homepage';
        }

        if (response.user && page === 'login') {
            window.location.hash = '#homepage';
        }

        $('.container').load('templates/' + page + '.html', function () {
        });
    })
}

handleRequest();

$(window).on('hashchange', handleRequest);

$('body').on('SECURITY_LOGOUT', handleRequest);

let calcutateTotalPrice = function() {
    let total = 0;
    products = JSON.parse(localStorage.getItem('products'));

    $.each(products, function(index, value) {
        if (value.price) {
            total += value.price * 1;
        }
    });

    return total;
}

let updateCartPrice = function () {
    $('.total').text(calcutateTotalPrice() + ' €');
}
updateCartPrice();

$('body').on('PRODUCT_ADDED_TO_CART', updateCartPrice);
