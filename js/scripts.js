/*jshint esversion: 6 */
// ============================================
//   Functions to Call On Page Load
// ============================================
$( document ).ready( function () {

  // Set initial focus to first textfield
  focusOnFirstInput();

  // Initially hide other-title
  hideOtherTitle();

  // Initialize event listeners
  showOrHideOtherTitle();

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
  // When user selects an option...
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



// --------------------------------------------
//   Register for Activities Section
// --------------------------------------------




// --------------------------------------------
//   Payment Info Section
// --------------------------------------------



// --------------------------------------------
//   Form Validation
// --------------------------------------------
