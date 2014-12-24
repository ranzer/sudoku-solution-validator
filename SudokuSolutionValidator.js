;(function(window) {
  var SudokuSolutionChecker;
  
  if (window.SudokuSolutionValidator == undefined) {  
    SudokuSolutionChecker = function(matrix) {
      var rowsCount;
      
      this.maxRows = 9;
      this.maxColumns = 9;
      
      if (Object.prototype.toString.call(matrix) !== '[object Array]') {
        throw 'Cannot create an instance of SudokuSolutionChecker object, invalid type of the matrix parameter';
      } else {
        rowsCount = matrix.length;
      if (rowsCount != 9) {
        throw 'Sudoku matrix needs to have exactly 9 rows';
      }
      while (--rowsCount >= 0) {
            if (Object.prototype.toString.call(matrix[rowsCount]) !== '[object Array]' ||
            matrix[rowsCount].length != 9) {
          throw new 'Each element of the Sudoku matrix must be an array of 9 elements';
        }
      }
	  }
	}
	  
	SudokuSolutionChecker.prototype.checkData = function(
	  firstCounterStart, 
    firstCounterLimit, 
	  secondCounterStart, 
	  secondCounterLimit, 
	  fnAssign, 
	  fnCheck,
	  fnGetMatrixValue) {
	  var firstCounter = firstCounterLimit,
		  secondCounter,
		  matrixValue,
		  numbers = new Array(firstCounterLimit),
      fnClearValue;
      
    fnClearValue = function(values) {
      var valuesCounter;
      for (valuesCounter = 0; valuesCounter < firstCounterLimit; valuesCounter++) {
        values[valuesCounter] = false;
      }
    };
  
	  while (--firstCounter >= firstCounterStart) {
	    fnClearValues(numbers);
	    secondCounter = secondCounterLimit;
	    while (--secondCounter >= secondCounterStart) {
        matrixValue = fnGetMatrixValue(firstCounter, secondCounter);
        if (!fnCheck(numbers, matrixValue)) {
          console.log('Number ' + matrixValue + ' is already found in the ' + (firstCounter + 1) + ' row.');
          return false;
        } else {
          fnAssign(numbers, matrixValue);
        }
	    }
	  }
	
	  return true;
  };
  
  SudokuSolutionChecker.prototype.fnAssign = function(numbers, value) {
    numbers[value - 1] = true;
  };
  
  SudokuSolutionChecker.prototype.fnCheck = function(numbers, value) {
    return numbers[value - 1] !== true;
  };
  
  SudokuSolutionChecker.prototype.checkRows = function(startingRow, endingRow, startingColumn, endingColumn) {
    var endingColumn = endingColumn || this.maxColumns,
      startingColumn = startingColumn || 0,
      endingRow = endingRow || this.maxRows,
      startingRow = startingRow || 0,
      result, fnGetMatrixValue;
    
    fnGetMatrixValue = function(rowIndex, columnIndex) {
      return this.matrix[rowIndex][columnIndex];
    };
    
    result = this.checkData(
      0, this.maxRows, 0, this.maxColumns, 
      this.fnAssign, this.fnCheck, fnGetMatrixValue);
    
    return result;
  }
  
  SudokuSolutionChecker.prototype.checkColumns = function() {
    var result, fnGetMatrixValue;
    
    fnGetMatrixValue = function(columnIndex, rowIndex) {
      return this.matrix[rowIndex][columnIndex];
    };
    result = this.checkData(
      0, this.maxColumns, 0, this.maxRows, 
      this.fnAssign, this.fnCheck, fnGetMatrixValue);
      
    return result;
  }
  
  SudokuSolutionChecker.prototype.check3x3 = function() {
    var horizontalStepsCounter,
        verticalStepsCounter,
        rowsCounter,
        columnsCounter,
        rowsLimit,
        columnsLimit,
        numbers,
        isValid;
      
    for (horizontalStepsCounter = 0; horizontalStepsCounter < this.maxColumns; horizontalStepsCounter += 3) {
      for (verticalStepsCounter = 0; verticalStepsCounter < this.maxRows; verticalStepsCounter += 3) {
        numbers = new Array(this.maxRows);
        isValid = this.checkRows(
          horizontalStepsCounter, horizontalStepsCounter + 3,
          verticalStepsCounter, verticalStepsCounter + 3);
        if (!isValid) {
          return false;
        }
      }
    }
	
    return true;
  };
	
  SudokuSolutionChecker.prototype.isSolved = function() {
    return this.checkRows() && this.checkColumns() && this.check3x3();
  };
	
    window.SudokuSolutionChecker = SudokuSolutionChecker;
  }
})(window);