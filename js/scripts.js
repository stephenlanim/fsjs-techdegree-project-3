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

  // Create arrays of options
  createJSOptionsArrays();

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


// const showShirtColorOptions = () => {
//   // When user selects a theme option...
//   $('#design').on('change', (e) => {
//     // Initialize array for storing matched options
//     const matchedOptions = [];
//     // Remove "selected" attribute from all color options
//     $colorOptions.removeProp('selected');
//
//     // If "JS Puns" <option> was selected...
//     if (e.target.value === 'js puns') {
//       $('#colors-js-puns').show();
//
//       // Loop through color options
//       $colorOptions.each((i) => {
//         // If option text contains "js puns"...
//         if ($colorOptions.eq(i).text().includes('JS Puns')) {
//           $colorOptions.eq(i).show();
//           $colorOptions.eq(i).removeAttr('disabled');
//           matchedOptions.push($colorOptions.eq(i));
//         }
//         else {
//           $colorOptions.eq(i).hide();
//           $colorOptions.eq(i).attr('disabled', 'true');
//           // Note: Had to also disable <option> since display:none does not work on form elements in Safari or IE.
//         }
//       }); // end of $.each loop
//
//     } // end of if 'js puns'
//
//     // If "Heart JS" <option> was selected...
//     else if (e.target.value === 'heart js') {
//       $('#colors-js-puns').show();
//       // const $colorOptions = $('#color').find('option');
//       // Loop through color options
//       $colorOptions.each((i) => {
//         // If option text contains "heart js"...
//         if ($colorOptions.eq(i).text().includes('♥ JS') || $colorOptions.eq(i).text().includes('&#9829; JS') ) {
//           $colorOptions.eq(i).show();
//           $colorOptions.eq(i).removeAttr('disabled');
//           matchedOptions.push($colorOptions.eq(i));
//         }
//         else {
//           $colorOptions.eq(i).hide();
//           $colorOptions.eq(i).attr('disabled', 'true');
//         }
//       }); // end of $.each loop
//
//     } // end of else if 'heart js'
//
//     else {
//       // Show all color options
//       $colorOptions.show();
//       $colorOptions.removeAttr('disabled');
//       // matchedOptions.push($colorOptions);
//       $('#colors-js-puns').hide();
//     } // end of else statement
//
//     // Select the first among matchedOptions
//     // console.log($(matchedOptions).eq(0));
//     $(matchedOptions).eq(0).prop('selected', 'selected');
//     // matchedOptions[0].selected = true;
//
//   }); // End of change handler
// }; // End of showShirtColorOptions()


// --------------------------------------------
//   Register for Activities Section
// --------------------------------------------
// Global Variables
const activitiesTotal = 0;
const displayTotal = $('<div></div>').text(`Total = ${activitiesTotal}`);
const $actvtyChkbxs = $('.activities input');

// When user checks activity...
$actvtyChkbxs.on('click', (e) => {
  let $checkedActivity = $(".activities :checked");
  const $clkdLblIndx = $actvtyChkbxs.index(e.target);
  const clkdLabelTxt = e.target.parentNode.textContent;
  const $clkdChkbx = $(e.target);


    // Loop through each checkbox label
    $('.activities label').each((i) => {
      const $currentLabel = $('.activities label').eq(i);
      const $currentCheckbox = $currentLabel.find('input');

      // Test conditions
      const _concurrentActivities = clkdLabelTxt.substring((clkdLabelTxt.length - 22), clkdLabelTxt.length) === $currentLabel.text().substring(($currentLabel.text().length - 22), $currentLabel.text().length);

      // If checkbox is being checked...
      if ($clkdChkbx.prop('checked') === true) {
        // If there is another activity at the same day and time...
        if (i !== $clkdLblIndx && _concurrentActivities) {

          // Disable conflicting activity
          $currentCheckbox.attr('disabled', 'true');
        }
      } // end of if being checked

      // If checkbox is being unchecked...
      if ($clkdChkbx.prop('checked') === false) {

        // If there is another activity at the same day and time...
        if (i !== $clkdLblIndx && _concurrentActivities) {

          // Reenable conflicting activity
          $currentCheckbox.removeAttr('disabled');
        }
      } // end of if being unchecked

    }); // end of $.each loop

    // Total equals sum of all checked activity prices

    // Display total below activities
    $('.activities').append(displayTotal);


}); // end of click handler



// --------------------------------------------
//   Payment Info Section
// --------------------------------------------



// --------------------------------------------
//   Form Validation
// --------------------------------------------
