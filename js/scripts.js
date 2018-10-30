/*jshint esversion: 6 */
// ============================================
//   Functions to Call On Page Load
// ============================================
$( document ).ready( function () {

  // Set initial focus to first textfield
  focusOnFirstInput();

  // Initially uncheck all activities
  resetActivities();

  // Initially hide other-title and color select menu
  hideOtherTitle();
  hideColorSelect();
  // resetColorOptions();

  // Set initial payment method to credit card
  selectCCOption();
  disableCCPromptOption();

  // Create arrays of options
  createJSOptionsArrays();

  // Initialize event listeners
  showOrHideOtherTitle();
  showShirtColorOptions();
  manageActivities();
  cleanupActivities();
  showPaymentInfo();
  validateOnInput(
    $userName,
    isValidName,
    noNameMessage,
    invalidNameMessage
  );
  validateOnInput(
    $userEmail,
    isValidEmail,
    noEmailMessage,
    invalidEmailMessage
  );
  validateForm();

});

// ============================================
//   Form Scripts
// ============================================

// Global Variables
const $textFields = $('input[type="text"]');

// Function to set cursor focus to first textfield
const focusOnFirstInput = () => {
  $('input[type="text"]').eq(0).focus();
};

// --------------------------------------------
//   Job Role Section
// --------------------------------------------

// Function to hide other-title input
const hideOtherTitle = () => $('#other-title').hide();

// Function to show other-title with "other" <option> is selected
const showOrHideOtherTitle = () => {
  // When user selects a job role option...
  $('#title').on('change', (e) => {
    // If "other" <option> was selected...
    if (e.target.value === 'other') {
      // Show other-title input
      $('#other-title').show();
    }
    else {
      $('#other-title').hide();
    }
  });
};

// --------------------------------------------
//   T-Shirt Info Section
// --------------------------------------------
// Global Variables
const $colorOptions = $('#color').find('option');
const $colorPrompt = $colorOptions.eq(0);
const jsPunsOptions = [];
const heartJSOptions = [];

// Function to hide #color select area
const hideColorSelect = () => {
  $('#colors-js-puns').hide();
};

// Function to reset color options
  // Note 1: Had to empty <select> instead of just hiding because Safari limits style (e.g. display property) changes on form elements. So hidden <options> tags kept showing up in Safari.
  // Note 2: I switched to using hideColorSelect() in accordance with the Exceeds Expectations requirements for this Treehouse project.
const resetColorOptions = () => {
  // Remove all options from <select>
  $('select#color').empty();

  // Insert choose-theme prompt option <select>
  $('select#color').append($colorPrompt);

  // Select prompt option
  $('#color').find('option').eq(0).prop('selected', 'selected');
};

// Function to create array of specific options
const createJSOptionsArrays = () => {
  // Loop through color options
  $colorOptions.each((i) =>{
    // If option is JS Puns...
    if ($colorOptions.eq(i).text().includes('JS Puns')) {
      jsPunsOptions.push($colorOptions.eq(i));
    }

    // If option is heart JS...
    else if ($colorOptions.eq(i).text().includes('♥ JS') || $colorOptions.eq(i).text().includes('&#9829; JS') ) {
      heartJSOptions.push($colorOptions.eq(i));
    }

  }); // end of $.each loop
}; // end of createJSOptionsArrays()

// Function to show appropriate set of colors when user chooses shirt design
const showShirtColorOptions = () => {
  // When user selects a theme option...
  $('#design').on('change', (e) => {

    // If "JS Puns" <option> was selected...
    if (e.target.value === 'js puns') {

      // Show color selection
      $('#colors-js-puns').show();

      // Remove all options from <select>
      $('select#color').empty();

      // Add jsPuns options to <select>
      $('select#color').append(jsPunsOptions);

      // Select first option
      $('#color').find('option').eq(0).prop('selected', 'selected');

    } // end of if 'js puns'

    // If "Heart JS" <option> was selected...
    else if (e.target.value === 'heart js') {

      // Show color selection
      $('#colors-js-puns').show();

      // Remove all options from <select>
      $('select#color').empty();

      // Add heartJS options to <select>
      $('select#color').append(heartJSOptions);

      // Select first option
      $('#color').find('option').eq(0).prop('selected', 'selected');

    } // end of else if 'heart js'

    else {

      // resetColorOptions();

      hideColorSelect();
      $('select#color').empty();

    } // end of else statement

  }); // End of change handler
}; // End of showShirtColorOptions()

// --------------------------------------------
//   Register for Activities Section
// --------------------------------------------
// Global Variables
let activitiesTotal = 0;
const $totalDiv = $('<div></div>')
  .append($('<span></span>').attr('id', 'displayTotal'));
const $actvtyChkbxs = $('.activities input');

// Display total below activities
$('.activities').append($totalDiv);

const $displayTotal = $('#displayTotal');

// Function to reset activity checkboxes
  // Note: I have to create this because Firefox likes to "help" the user by saving the checked boxes even after refreshing the page. This was messing with the activitiesTotal.
const resetActivities = () => {
  $actvtyChkbxs.prop('checked', false);
};

// Function to manage the results of selecting activities
const manageActivities = () => {
  // When user checks activity...
  $actvtyChkbxs.on('click', (e) => {
    const $clkdLblIndx = $actvtyChkbxs.index(e.target);
    const clkdLabelTxt = e.target.parentNode.textContent;
    const $clkdChkbx = $(e.target);
    const $price = parseInt(clkdLabelTxt.substring((clkdLabelTxt.length - 3), clkdLabelTxt.length));

      // If checkbox is being checked...
      if ($clkdChkbx.prop('checked') === true) {

        // Loop through each checkbox label
        $('.activities label').each((i) => {
          const $currentLabel = $('.activities label').eq(i);
          const $currentCheckbox = $currentLabel.find('input');

          // Test conditions
          const _concurrentActivities = clkdLabelTxt.substring((clkdLabelTxt.length - 22), clkdLabelTxt.length) === $currentLabel.text().substring(($currentLabel.text().length - 22), $currentLabel.text().length);

          // If there is another activity at the same day and time...
          if (i !== $clkdLblIndx && _concurrentActivities) {

            // Disable conflicting activity
            $currentCheckbox.attr('disabled', 'true');
          }

        }); // end of $.each loop

        // Add price of clicked activity to total
        activitiesTotal += $price;

      } // end of if being checked

      // If checkbox is being unchecked...
      if ($clkdChkbx.prop('checked') === false) {

        // Loop through each checkbox label
        $('.activities label').each((i) => {
          const $currentLabel = $('.activities label').eq(i);
          const $currentCheckbox = $currentLabel.find('input');

          // Test conditions
          const _concurrentActivities = clkdLabelTxt.substring((clkdLabelTxt.length - 22), clkdLabelTxt.length) === $currentLabel.text().substring(($currentLabel.text().length - 22), $currentLabel.text().length);

          // If there is another activity at the same day and time...
          if (i !== $clkdLblIndx && _concurrentActivities) {

            // Reenable conflicting activity
            $currentCheckbox.removeAttr('disabled');
          }

        }); // end of $.each loop

        // Subtract price of clicked activity from total
        activitiesTotal -= $price;

      } // end of if being unchecked

      // Display total below activities
      $displayTotal.text(`Total = $${activitiesTotal}`);

  }); // end of click handler
}; // end of manageActivities()


// --------------------------------------------
//   Payment Info Section
// --------------------------------------------
// Global variables
const $paymentSections = $('#paymentInfo > div');
const $paymentOptions = $('#payment > option');

// Function to disable "Select Payment Method" prompt option
const disableCCPromptOption = () => {
  $('[value="select_method"]').prop('disabled', 'disabled');
};

// Function to select credit-card option
const selectCCOption = () => {
  $('[value="credit card"]').prop('selected', 'selected');
  $paymentSections.hide();
  $paymentSections.eq(0).show();
};


// Function to show appropriate inputs or info when a given option is selected and hide others
const showPaymentInfo = () => {

  // When user selects a payment method...
  $('#payment').on('change', (e) => {

    // Initialize varible for index of option that was just selected
    let selectPymntIndex;
    // Loop through options
    $paymentOptions.each((i) => {
      // If this option is selected...
      if ($paymentOptions.eq(i).prop('selected')) {

        // selectedOption = $paymentOptions.eq(i);
        selectPymntIndex = i;
      }
    }); // end of selected payment method scripts

    // If selected option is "Select Payment Method"...
    if (selectPymntIndex === 0) {
      $paymentSections.hide();
    }
    else {
      $paymentSections.hide();
      // Show payment section that matches payment method
      $paymentSections.eq(selectPymntIndex - 1).show();
    }

  }); // end of change handler

}; // end of showPaymentInfo


// --------------------------------------------
//   Form Validation
// --------------------------------------------
// Global Variables
const $userName = $('#name');
const $userEmail = $('#mail');
const $ccNum = $('#cc-num');
const $ccZip = $('#zip');
const $ccCVV = $('#cvv');

// Function to create an alert message
const createAlert = (inputField, errorMessage) => {
  const $toolTipParent = $('<div></div>').addClass('tooltip-parent');
  const $toolTip = $('<span></span>').addClass('tooltip');
  // Insert alert text
  $toolTip.text(errorMessage);
  // Append toolTip to parent span
  $toolTipParent.append($toolTip);
  // Make container position relative
  // inputField.parent().css('position', 'relative');
  $toolTipParent.css('position', 'relative');
  // Insert tooltip parent after input field
  inputField.after($toolTipParent);
};

// Function to validate user input on function call
const validate = (inputField, comparison, emptyAlert, invalidAlert) => {
  // Remove any other alert messages
  inputField.next('.tooltip-parent').remove();

  // If input field is empty...
  if (inputField.val().length === 0) {
    // Show alert for empty field
    createAlert(inputField, emptyAlert);
  }
  // If user input is invalid against RegEx...
  else if (!comparison(inputField.val())){
    // Show alert for invalid entry
    createAlert(inputField, invalidAlert);
  }
  // If user input is valid...
  else if (comparison(inputField.val())){
    // Remove any corresponding alert messages
    inputField.next('.tooltip-parent').remove();
  }
}; // end of validate()

// Function to validate user input in real time
const validateOnInput = (inputField, comparison, emptyAlert, invalidAlert) => {

  inputField.on('input', () => {
    validate(inputField, comparison, emptyAlert, invalidAlert);
  });
}; // end of validateOnInput()


/* --- Validate Name --- */
const noNameMessage = `Please enter a name.`;
const invalidNameMessage = `Name must contain only letters and spaces. Example: John Smith.`;

const isValidName = (name) => {
  return /^[a-z]{1}[\s[a-z]*$/i.test(name);
};


/* --- Validate Email --- */
const noEmailMessage = `This field cannot be left blank. Please provide an email.`;
const invalidEmailMessage = `Must be a valid email. Example: person.mcperson@example.com.`;

const isValidEmail = (email) => {
  return /^[^@]+@[^@.]+\.[a-z]+$/i.test(email);
}

/* --- Validate Activities --- */
const noActivitiesMessage = `You must register for at least 1 activity before submitting.`;

// Function to verify that activities have been checked
const validateActivities = () => {

  let checkedActsQty = 0;
  // Loop through activity checkbox
  $actvtyChkbxs.each((i) => {
    // If this checbox is checked...
    if ($actvtyChkbxs.eq(i).prop('checked')) {

      checkedActsQty++;
    }
  }); // end of selected payment method scripts

  // If no activities are selected...
  if (checkedActsQty === 0) {
    // Show relevant alert message
    createAlert($('.activities > :last-child'), noActivitiesMessage);
  }
  else {
    // Remove any corresponding alert messages
    $('.activities').find('.tooltip-parent').remove();
  }
}; // end of validateActivities()

// Function to remove Activities error message once criterion is fulfilled
const cleanupActivities = () => {
  $actvtyChkbxs.on('change', () => {
    if ($('.activities').find('.tooltip-parent')) {
      $('.activities').find('.tooltip-parent').remove();
    }
  });
};

/* --- Validate Payment Method --- */

const noCCNumMessage = `Please provide a credit card number or select another payment method.`;
const invalidCCNum = `Credit card number must be between 13 and 16 digits.`;

const noZipMessage = `Please provide a 5-digit zip code if using this payment method.`;
const invalidZip = `Zip code must be 5 digits.`;

const noCVVMessage = `Please provide the 3-digit CVV if using this payment method.`;
const invalidCVV = `CVV must be 3 digits.`;

// Credit card number validator
const isValidCCNum = (ccNum) => {
  if (isNaN(ccNum)){
    return false;
  }
  else {
    return /^\d{13,16}$/.test(parseInt(ccNum));
  }
};

// Zip validator
const isValidZip = (zip) => {
  if (isNaN(zip)){
    return false;
  }
  else {
    return /^\d{5}$/.test(parseInt(zip));
  }
};

// CVV Validator
const isValidCVV = (cvv) => {
  if (isNaN(cvv)){
    return false;
  }
  else {
    return /^\d{3}$/.test(parseInt(cvv));
  }
};


// Function to check validity of information upon form submission
const validateForm = () => {
  $('form').on('submit', (e) => {



    validate(
      $userName,
      isValidName,
      noNameMessage,
      invalidNameMessage
    );

    validate(
      $userEmail,
      isValidEmail,
      noEmailMessage,
      invalidEmailMessage
    );

    validateActivities();

    // If credit-card payment method is selected...
    if ($('[value="credit card"]').prop('selected')) {

      // Validate credit card number
      validate(
        $ccNum,
        isValidCCNum,
        noCCNumMessage,
        invalidCCNum
      );

      // Validate Zip
      validate(
        $ccZip,
        isValidZip,
        noZipMessage,
        invalidZip
      );

      // Validate CVV
      validate(
        $ccCVV,
        isValidCVV,
        noCVVMessage,
        invalidCVV
      );

    }
    else {
      $('#credit-card').find('.tooltip-parent').remove();
    } // end of if/else CC method selected

    // If there are any error messages...
    if ($('.tooltip').length !== 0){
      e.preventDefault();
      // Submit form
      // $('form').submit();
      // console.log('Ready to submit.');
    }

  }); // end of submit handler
}; // end of validateForm()
