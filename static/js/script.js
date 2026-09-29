/**
 * FINVEXA Frontend Interactive Controller
 * Authors: Ruhaan, Nimish, Raman
 */

console.log("FINVEXA Financial Engine Initialized.");

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

function handleAutoFill(endpoint, formId, callback) {
  fetch(endpoint)
    .then(response => response.json())
    .then(data => {
      if (callback) {
        callback(data);
      }
    })
    .catch(err => {
      console.error("Auto-Fill error:", err);
    });
}
