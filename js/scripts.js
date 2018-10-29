/*jshint esversion: 6 */
// ============================================
//   Functions to Call On Page Load
// ============================================
$( document ).ready( function () {

  // Set initial focus to first textfield
  focusOnFirstInput();

  // Set initial payment method to credit card
  selectCCOption();
  disableCCPromptOption();

  // Initially hide other-title and color select
  hideOtherTitle();
  hideColorSelect();

  // Create arrays of options
  createJSOptionsArrays();

  // Initialize event listeners
  showOrHideOtherTitle();
  showShirtColorOptions();
  showPaymentInfo();
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

// Regular expression for capturing email address: [\w.]*@[\w]*\.\w*

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
const jsPunsOptions = [];
const heartJSOptions = [];

// Function to hide #color select area
const hideColorSelect = () => {
  $('#colors-js-puns').hide();
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

// Function to show or hide #color <select>


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

    } // end of if 'js puns'

    // If "Heart JS" <option> was selected...
    else if (e.target.value === 'heart js') {
      // Show color selection
      $('#colors-js-puns').show();

      // Remove all options from <select>
      $('select#color').empty();

      // Add heartJS options to <select>
      $('select#color').append(heartJSOptions);

    } // end of else if 'heart js'

    else {
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


// Function to show appropriate inputs or info when a given option is selected and hide others.
const showPaymentInfo = () => {

  // When user selects a payment method...
  $('#payment').on('change', (e) => {

    // Get option that was just selected
    // let selectedOption;
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


/* --- Validate Name --- */
const isValidName = (name) => {
  return /[\w]+/.test(name);
};

// Invalid name alert message
const nameAlert = () => {console.log("Name invalid.")};

/* --- Validate Email --- */
const isValidEmail = (email) => {
  return /^[^@]+@[^@.]+\.[a-z]+$/i.test(email);
}

// Invalid email alert message
const emailAlert = () => {console.log("Email invalid.")};

/* --- Validate Activities --- */

// Invalid activities alert message
const activitiesAlert = () => {console.log("No checked activities.")};

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
    activitiesAlert();
  }
}; // end of validateActivities()

/* --- Validate Payment Method --- */

// Invalid ccNum alert message
const ccNumAlert = () => {console.log("ccNum invalid.")};

const isValidCCNum = (ccNum) => {
  return /\d{13,16}/.test(parseInt(ccNum));
};

// Invalid zip alert message
const zipAlert = () => {console.log("Zip invalid.")};

const isValidZip = (zip) => {
  return /\d{5}/.test(parseInt(zip));
};

// Invalid cvv alert message
const cvvAlert = () => {console.log("CVV invalid.")};

const isValidCVV = (cvv) => {
  return /\d{3}/.test(parseInt(cvv));
};


// Function to check validity of information upon form submission
const validateForm = () => {
  $('form').on('submit', (e) => {
    e.preventDefault();

    // validateName()

    // validateEmail()

    validateActivities();

    // validateCCNum()

    // validateZip()

    // validateCVV()




  }); // end of submit handler
}; // end of validateForm()
