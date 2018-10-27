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
  showShirtColorOptions();

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

// Function to show appropriate set of colors when user chooses shirt design
const showShirtColorOptions = () => {
  // When user selects a theme option...
  $('#design').on('change', (e) => {
    const $colorOptions = $('#color').find('option');
    // If "JS Puns" <option> was selected...
    if (e.target.value === 'js puns') {
      // const $colorOptions = $('#color').find('option');
      // Loop through color options
      $colorOptions.each((i) => {
        // If option text contains "js puns"...
        if ($colorOptions.eq(i).text().includes('JS Puns')) {
          $colorOptions.eq(i).show();
        }
        else {
          $colorOptions.eq(i).hide();
        }
      }); // end of $.each loop

    } // end of if 'js puns'

    // If "Heart JS" <option> was selected...
    else if (e.target.value === 'heart js') {
      // const $colorOptions = $('#color').find('option');
      // Loop through color options
      $colorOptions.each((i) => {
        // If option text contains "heart js"...
        if ($colorOptions.eq(i).text().includes('♥ JS') || $colorOptions.eq(i).text().includes('&#9829; JS') ) {
          $colorOptions.eq(i).show();
        }
        else {
          $colorOptions.eq(i).hide();
        }
      }); // end of $.each loop

    } // end of else if 'heart js'

    else {
      // Show all color options
      $colorOptions.show();
    } // end of else statement

        // If option value matches one of the appropriate colors...
        // if ($colorOptions.eq(i).val() === 'cornflowerblue' || $colorOptions.eq(i).val() === 'darkslategrey' || $colorOptions.eq(i).val() === 'gold') {
        //   // Show that option
        //   $colorOptions.eq(i).show();
        // }
        // else {
        //   $colorOptions.eq(i).hide();
        // }

        // $('#color').find('option').val('cornflowerblue').show();
        // $('#color').find('option').val('darkslategrey').show();
        // $('#color').find('option').val('gold').show();

      // If option value matches one of the appropriate colors...
      // Show that option
      // $('#color').find('option').val('cornflowerblue').show();
      // $('#color').find('option').val('darkslategrey').show();
      // $('#color').find('option').val('gold').show();
      //
      // // Hide other colors
      // $('#color').find('option').val('tomato').hide();
      // $('#color').find('option').val('steelblue').hide();
      // $('#color').find('option').val('dimgrey').hide();


    // // else if "I heart JS" <option> was selected...
    // else if (e.target.value === 'heart js') {
    //   // Show matching colors
    //   $('#color').find('option').val('tomato').show();
    //   $('#color').find('option').val('steelblue').show();
    //   $('#color').find('option').val('dimgrey').show();
    //   // Hide other colors
    //   $('#color').find('option').val('cornflowerblue').hide();
    //   $('#color').find('option').val('darkslategrey').hide();
    //   $('#color').find('option').val('gold').hide();
    // }
    // else {
    //   // Show all colors
    //   $('#color').find('option').val('cornflowerblue').show();
    //   $('#color').find('option').val('darkslategrey').show();
    //   $('#color').find('option').val('gold').show();
    //   $('#color').find('option').val('tomato').show();
    //   $('#color').find('option').val('steelblue').show();
    //   $('#color').find('option').val('dimgrey').show();
    // }
  });
};


// --------------------------------------------
//   Register for Activities Section
// --------------------------------------------




// --------------------------------------------
//   Payment Info Section
// --------------------------------------------



// --------------------------------------------
//   Form Validation
// --------------------------------------------
