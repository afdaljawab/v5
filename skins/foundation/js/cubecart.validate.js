jQuery(document).ready(function () {
   $.validator.setDefaults({
      errorElement: 'small'
   });
   $.validator.addMethod("phone", function (phone, element) {
      phone = phone.replace(/\s+/g, "");
      return this.optional(element) || phone.match(/^[0-9-+()]+$/);
   }, $('#validate_phone').text());

   $.extend(jQuery.validator.messages, {
      required: $('#validate_field_required').text()
   });

   $("#newsletter_form, #newsletter_form_box").validate({
      rules: {
         subscribe: {
            required: true,
            email: true,
            remote: {
	          url: "?_g=ajax_email&source=newsletter",
	          type: "post",
	          data: {
	            username: function() {
	              return $( "#newsletter_email" ).val();
	            }
	          }
	        }
         },
      },
      messages: {
         subscribe: {
            required: $('#validate_email').text(),
            email: $('#validate_email').text(),
            remote: $('#validate_already_subscribed').text()
         },
      }
   });
   
   $("#checkout_form").validate({   
      errorPlacement: function (error, element) {
         if (element.attr("name") == "terms_agree") {
            element.removeClass("error");
            alert(error.text());
         } else {
            error.insertAfter(element);
         }
      },
      rules: {
         'user[first_name]': {
            required: true
         },
         'user[last_name]': {
            required: true
         },
         'user[email]': {
            required: true,
            email: true,
            remote: {
	          url: "?_g=ajax_email",
	          type: "post",
	          data: {
	            username: function() {
	              return $( "#user_email" ).val();
	            }
	          }
	        }
         },
         'user[phone]': {
            required: true,
            phone: true
         },
         'user[mobile]': {
            phone: true
         },
         'billing[line1]': {
            required: true
         },
         'billing[town]': {
            required: true
         },
         'billing[country]': {
            required: true
         },
         'billing[state]': {
            required: true
         },
         'billing[postcode]': {
            required: true
         },
         'delivery[line1]': {
            required: true
         },
         'delivery[town]': {
            required: true
         },
         'delivery[country]': {
            required: true
         },
         'delivery[state]': {
            required: true
         },
         'delivery[postcode]': {
            required: true
         },
         password: {
            required: true,
            minlength: 6
         },
         passconf: {
            equalTo: "#password"
         },
         terms_agree: {
            required: true
         }
      },
      messages: {
         'user[email]': {
            required: $('#validate_email').text(),
            email: $('#validate_email').text(),
            remote: $('#validate_email_in_use').text()
         },
         'user[phone]': {
            required: $('#validate_phone').text(),
            phone: $('#validate_phone').text()
         },
         'user[mobile]': {
            phone: $('#validate_mobile').text()
         },
         password: {
            required: $('#validate_password').text(),
            minlength: $('#validate_password_length').text()
         },
         passconf: {
            required: $('#validate_password_mismatch').text(),
            equalTo: $('#validate_password_mismatch').text()
         },
         terms_agree: {
            required: $('#validate_terms_agree').text()
         }
      }
   });
   
   
   $("#addressbook_form").validate({
      rules: {
         description: {
            required: true
         },
         first_name: {
            required: true
         },
         last_name: {
            required: true
         },
         line1: {
            required: true
         },
         town: {
            required: true
         },
         country: {
            required: true
         },
         state: {
            required: true
         },
         postcode: {
            required: true
         }
      }
   });
   $("#lookup_order").validate({
      rules: {
         cart_order_id: {
            required: true
         },
         email: {
            required: true,
            email: true
         }
      },
      messages: {
         email: {
            required: $('#validate_email').text(),
            email: $('#validate_email').text()
         },
      }
   });

   $("#search_form, #small_search_form").validate({
      rules: {
         'search[keywords]': {
            required: true
         }
      },
      messages: {
         'search[keywords]': {
            required: $('#validate_search').text()
         }
      }
   });

   $("#advanced_search_form").validate({
      rules: {
         'search[keywords]': {
            required: true
         }
      },
      messages: {
         'search[keywords]': {
            required: $('#validate_search').text()
         }
      }
   });

   $("#login_form").validate({
      rules: {
         username: {
            required: true,
            email: true
         },
         password: {
            required: true
         }
      },
      messages: {
         username: {
            required: $('#validate_email').text(),
            email: $('#validate_email').text()
         },
         password: {
            required: $('#empty_password').text()
         }
      }
   });

   $("#registration_form").validate({

      errorPlacement: function (error, element) {
         if (element.attr("name") == "terms_agree") {
            element.removeClass("error");
            alert(error.text());
         } else {
            error.insertAfter(element);
         }
      },
      rules: {
         first_name: {
            required: true
         },
         last_name: {
            required: true
         },
         email: {
            required: true,
            email: true,
            remote: {
	          url: "?_g=ajax_email",
	          type: "post",
	          data: {
	            username: function() {
	              return $( "#email" ).val();
	            }
	          }
	        }
         },
         phone: {
            required: true,
            phone: true
         },
         mobile: {
            required: false,
            phone: true
         },
         password: {
            required: true,
            minlength: 6
         },
         passconf: {
            equalTo: "#password"
         },
         terms_agree: {
            required: true
         }
      },
      messages: {
         first_name: {
            required: $('#validate_firstname').text()
         },
         last_name: {
            required: $('#validate_lastname').text()
         },
         email: {
            required: $('#validate_email').text(),
            email: $('#validate_email').text(),
            remote: $('#validate_email_in_use').text()
         },
         phone: {
            required: $('#validate_phone').text(),
            phone: $('#validate_phone').text()
         },
         mobile: {
            phone: $('#validate_mobile').text()
         },
         password: {
            required: $('#validate_password').text(),
            minlength: $('#validate_password_length').text()
         },
         passconf: {
            required: $('#validate_password_mismatch').text(),
            equalTo: $('#validate_password_mismatch').text()
         },
         terms_agree: {
            required: $('#validate_terms_agree').text()
         }
      }
   });

   $("#profile_form").validate({
      rules: {
         first_name: {
            required: true
         },
         last_name: {
            required: true
         },
         email: {
            required: true,
            email: true
         },
         phone: {
            required: true,
            phone: true
         },
         mobile: {
            required: false,
            phone: true
         },
         passold: {
            minlength: 6,
         },
         passnew: {
            minlength: 6,
         },
         passconf: {
            equalTo: "#passnew",
         }
      },
      messages: {
         first_name: {
            required: $('#validate_firstname').text()
         },
         last_name: {
            required: $('#validate_lastname').text()
         },
         email: {
            required: $('#validate_email').text(),
            email: $('#validate_email').text()
         },
         phone: {
            required: $('#validate_phone').text(),
            phone: $('#validate_phone').text()
         },
         mobile: {
            phone: $('#validate_mobile').text()
         },
         passold: {
            minlength: $('#validate_password_length').text()
         },
         passnew: {
            minlength: $('#validate_password_length').text()
         },
         passconf: {
            equalTo: $('#validate_password_mismatch').text()
         }
      }
   });
   /* Reset Form */
   $('input:reset').click(function () {
      $(this).parents('form:first').validate().resetForm();
   });

});