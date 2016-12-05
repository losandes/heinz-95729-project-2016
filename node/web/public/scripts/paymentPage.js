var userId = document.getElementById("userid").innerHTML;
userId = $.trim(userId);

function stripeCall() {
  var $form = $('#payment-form');
  //$form.submit(function(event) {
    // Disable the payment button to prevent repeated clicks:
    $('.paymentButton').prop('disabled', true);

    // Request a token from Stripe:
    Stripe.card.createToken($form, stripeResponseHandler);

    // Prevent the form from being submitted:
    return false;
  //});
};

function stripeResponseHandler(status, response) {
  // Grab the form:
  var $form = $('#payment-form');

  if (response.error) { // Problem!

    // Show the errors on the form:
    $form.find('.payment-errors').text(response.error.message);
    $('.paymentButton').prop('disabled', false); // Re-enable submission

  } else { // Token was created!

    // Get the token ID:
    var token = response.id;

    // Insert the token ID into the form so it gets submitted to the server:
    $form.append($('<input type="hidden" name="stripeToken">').val(token));

    // Submit the form:
    $form.get(0).submit();
    directToOrderDetails();
  }
};

function directToPayment()
{
  window.location.href = "/payment/" + userId;
}

function directToOrderDetails()
{
  window.location.href = "/orderDetails/" + userId;
}