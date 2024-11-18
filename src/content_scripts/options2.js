document.addEventListener('DOMContentLoaded', function() {
    const variableNames = ['targetUrl', 'reloadCounter','reloadCounterMax','delaySeconds', "noPdfViewer", "cycleFavDirs_lastTab", "favTabLast", "favTab1", "favWindow1", "favWindow2"];
  
    // Load stored values and create input fields
    loadStoredVariables();
  
    // Save button click event listener
    document.getElementById('saveButton').addEventListener('click', function() {
      saveVariables();
    });
  
    function loadStoredVariables() {
      const variableInputsDiv = document.getElementById('variableInputs');
      variableNames.forEach(variableName => {
        let inputContainer = document.createElement('div');
        inputContainer.classList.add('variable-container');
  
        let label = document.createElement('label');
        label.textContent = `${variableName}:`;
  
        let input = document.createElement('input');
        input.type = 'text';
        input.id = variableName;
        input.name = variableName;
  
        inputContainer.appendChild(label);
        inputContainer.appendChild(input);
        variableInputsDiv.appendChild(inputContainer);
  
        // Load stored value for this variable
        chrome.storage.local.get(variableName, function(result) {
          if (result[variableName]) {
            input.value = result[variableName];
          }
        });
      });
    }
  
    function saveVariables() {
      const valuesToSave = {};
      variableNames.forEach(variableName => {
        const value = document.getElementById(variableName).value.trim();
        if (value !== '') {
          valuesToSave[variableName] = value;
        }
      });
  
      chrome.storage.local.set(valuesToSave, function() {
        console.log('Variables saved:', valuesToSave);
        showStatusMessage('Variables saved successfully.', 'green');
      });
    }
  
    function showStatusMessage(message, color) {
      const statusDiv = document.getElementById('status');
      statusDiv.textContent = message;
      statusDiv.style.color = color;
      setTimeout(function() {
        statusDiv.textContent = '';
      }, 3000);
    }
  });
  