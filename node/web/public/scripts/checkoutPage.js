/* Set rates + misc */
var fadeTime = 100;
$('.emptyShoppingCart').hide();

/* Recalculate cart */
function recalculateCart()
{
  var total = 0;
  /* Sum up row totals */
  $('.product').each(function () {
    total += parseFloat($(this).children('.product-price').text());
  });
/* Update totals display */
  $('.totals-value').fadeOut(fadeTime, function() {
    $('#cart-total').html(total.toFixed(2));
    if(total == 0){
      $('.checkout').fadeOut(fadeTime);
      $('.emptyShoppingCart').show();
      document.getElementById('.emptyShoppingCart').style.display="block"
      $('.shopping-cart').hide();
    }else{
      $('.checkout').fadeIn(fadeTime);
      $('.totals-value').fadeIn(fadeTime);
    }   
  });
}

/* Remove item from cart */
function removeItem(removeButton)
{
  /* Remove row from DOM and recalc cart total */
  var productRow = $(removeButton).parent().parent();
  productRow.slideUp(fadeTime, function() {
    productRow.remove();
    recalculateCart();
  });
}


  