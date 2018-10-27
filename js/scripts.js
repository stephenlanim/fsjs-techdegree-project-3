/*jshint esversion: 6 */
// ============================================
//   Functions to Call On Page Load
// ============================================
$( document ).ready( function () {

  // Set initial focus to first textfield
  focusOnFirstInput();

  // Initially hide other-title and color select
  hideOtherTitle();
  hideColorSelect();

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
// Global Variables
const $colorOptions = $('#color').find('option');


// Function to hide #color select area
const hideColorSelect = () => {
  $('#colors-js-puns').hide();
};

// Function to show or hide #color <select>


// Function to show appropriate set of colors when user chooses shirt design
const showShirtColorOptions = () => {
  // When user selects a theme option...
  $('#design').on('change', (e) => {
    // Initialize array for storing matched options
    const matchedOptions = [];
    // Remove "selected" attribute from all color options
    $colorOptions.removeProp('selected');

    // If "JS Puns" <option> was selected...
    if (e.target.value === 'js puns') {
      $('#colors-js-puns').show();

      // Loop through color options
      $colorOptions.each((i) => {
        // If option text contains "js puns"...
        if ($colorOptions.eq(i).text().includes('JS Puns')) {
          $colorOptions.eq(i).show();
          $colorOptions.eq(i).removeAttr('disabled');
          matchedOptions.push($colorOptions.eq(i));
        }
        else {
          $colorOptions.eq(i).hide();
          $colorOptions.eq(i).attr('disabled', 'true');
          // Note: Had to also disable <option> since display:none does not work on form elements in Safari or IE.
        }
      }); // end of $.each loop

    } // end of if 'js puns'

    // If "Heart JS" <option> was selected...
    else if (e.target.value === 'heart js') {
      $('#colors-js-puns').show();
      // const $colorOptions = $('#color').find('option');
      // Loop through color options
      $colorOptions.each((i) => {
        // If option text contains "heart js"...
        if ($colorOptions.eq(i).text().includes('♥ JS') || $colorOptions.eq(i).text().includes('&#9829; JS') ) {
          $colorOptions.eq(i).show();
          $colorOptions.eq(i).removeAttr('disabled');
          matchedOptions.push($colorOptions.eq(i));
        }
        else {
          $colorOptions.eq(i).hide();
          $colorOptions.eq(i).attr('disabled', 'true');
        }
      }); // end of $.each loop

    } // end of else if 'heart js'

    else {
      // Show all color options
      $colorOptions.show();
      $colorOptions.removeAttr('disabled');
      // matchedOptions.push($colorOptions);
      $('#colors-js-puns').hide();
    } // end of else statement

    // Select the first among matchedOptions
    // console.log($(matchedOptions).eq(0));
    $(matchedOptions).eq(0).prop('selected', 'selected');
    // matchedOptions[0].selected = true;

  }); // End of change handler
}; // End of showShirtColorOptions()


// --------------------------------------------
//   Register for Activities Section
// --------------------------------------------




// --------------------------------------------
//   Payment Info Section
// --------------------------------------------



// --------------------------------------------
//   Form Validation
// --------------------------------------------
