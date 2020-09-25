(function(){
    let productsContent = "";
    
    $.get('data/product.json', function(products) {
        $.each(products, function(id, product) {
            productsContent += `
            <div class="col-12 col-md-6 col-lg-4" style="margin-top: 15px; margin-bottom: 15px;">
                <div class="card" data-product='${JSON.stringify(product)}'>
                    <img class="card-img-top" src="${product.image}" alt="Card image cap" style="width: 150px; height: 150px; margin: 0 auto;">
                    <div class="card-body">
                        <h4 class="card-title" style="height:80px; overflow: hidden;">${product.title}</h4>
                        <div class="row">
                            <div class="col">
                                <p class="cta-acheter btn btn-danger btn-block">${product.price} €</p>
                            </div>
                            <div class="col">
                                <a href="#" class="cta-acheter btn btn-success btn-block">Add to cart</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `;
    
            $('.products .row').html(productsContent);
        });

        $('body').trigger('PRODUCT_LOADED');
    });
})();

$('body').on('PRODUCT_LOADED', function() {

    $('.cta-acheter').click(function(event) {
        event.preventDefault();

        if (localStorage.getItem('products') && localStorage.getItem('products') !== '') {
            products = JSON.parse(localStorage.getItem('products'));
        }

        let product = $(this).parents('.card').data('product');

        if (products === null) {
            products = [];
        }

        products.push(product);

        localStorage.setItem('products', JSON.stringify(products));

        $('body').trigger('PRODUCT_ADDED_TO_CART', product);
    });
});
