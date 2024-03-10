import React, { useEffect, useState } from 'react'
import { BiSort } from 'react-icons/bi'
import { AiFillPlayCircle } from 'react-icons/ai'
import { RiCheckboxBlankFill } from 'react-icons/ri'
import theory from './theory'
const SortingVisalizer = () => {
  const [array, setArray] = useState([])
  const [arraySize, setArraySize] = useState(10)
  const [algo, setAlgo] = useState(theory[0])
  const [startSorting, setStartSorting] = useState(false)
  const [animationSpeed, setAnimationSpeed] = useState(300)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [temp, setTemp] = useState(array[1])
  const [text, setText] = useState("")
  window.addEventListener("resize", () => {
    setWindowWidth(window.innerWidth);
  });
  useEffect(() => {
    randomizeArray()
  }, [])
  useEffect(() => {
    randomizeArray()
  }, [arraySize])
  const randomizeArray = () => {
    for (var i = 0; i < array.length; i++) {
      var bar = document.getElementById(i).style;
      bar.backgroundColor = "#343434";
    }
    var temparray = [];
    for (var j = 0; j < arraySize; j++) {
      temparray.push(randomVals(20, 400));
    }
    setArray(temparray);
  }

  // Generates a random val between min and max
  const randomVals = (min, max) => {
    var randomVal = Math.floor(Math.random() * (max - min + 1) + min);
    return randomVal;
  }

  // Delay function 
  const delay = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time));
  };


  useEffect(() => {

    if (windowWidth < 750 && arraySize === '25') {
      setArraySize(10)
    }
  }, [windowWidth])
  // Bubble Sort
  const bubbleSort = async () => {
    let animationSpeed = arraySize == 25 ? 150 : 250
    setStartSorting(true)
    var currentArr = [...array];
    for (var j = 0; j < currentArr.length - 1; j++) {
      var swapped = false
      for (var i = 0; i < currentArr.length - 1 - j; i++) {
        let bar1 = document.getElementById(i).style;
        let bar2 = document.getElementById(i + 1).style;
        bar1.backgroundColor = "green"
        bar2.backgroundColor = "green"
        await delay(animationSpeed);
        if (currentArr[i] > currentArr[i + 1]) {
          swapped = true
          var swap1 = currentArr[i];
          var swap2 = currentArr[i + 1];
          currentArr[i] = swap2;
          currentArr[i + 1] = swap1;
          setArray([...currentArr]);
          await delay(2 * animationSpeed);

        }
        //Change back the Style back to original
        bar1.backgroundColor = "#343434";
        bar2.backgroundColor = "#343434";
        await delay(animationSpeed);
      }
      if (!swapped) {
        break;
      }
      document.getElementById(currentArr.length - 1 - j).style.backgroundColor = "blue"
    }
    setStartSorting(false)
  }

  // Merge Sort
  const merge = async (arr, left, right) => {
    let bars = []
    for (let index = left; index <= right; index++) {
      bars.push(document.getElementById(index).style)
      document.getElementById(index).style.backgroundColor = "orange"
    }
    await delay(2 * animationSpeed)
    var mid = Math.floor((left + right) / 2);
    var indexOfLeftPart = left;
    var indexOfRightPart = mid + 1;
    var tempArr = [];

    while (indexOfLeftPart <= mid && indexOfRightPart <= right) {
      if (arr[indexOfLeftPart] < arr[indexOfRightPart]) {
        tempArr.push(arr[indexOfLeftPart]);
        indexOfLeftPart++;
      }
      else {
        tempArr.push(arr[indexOfRightPart]);
        indexOfRightPart++;
      }
    }
    while (indexOfRightPart <= right) {
      tempArr.push(arr[indexOfRightPart]);
      indexOfRightPart++;
    }
    while (indexOfLeftPart <= mid) {
      tempArr.push(arr[indexOfLeftPart]);
      indexOfLeftPart++;
    }
    var t = 0;
    for (var j = left; j <= right; j++) {
      arr[j] = tempArr[t];
      t++;
    }
    setArray([...arr])
    await delay(2 * animationSpeed)

    for (let index = 0; index < bars.length; index++) {
      bars[index].backgroundColor = "#343434"
    }
  }
  const mergeSortHelper = async (arr, left, right) => {
    if (left < right) {
      var mid = Math.floor((left + right) / 2);
      await mergeSortHelper(arr, left, mid);
      await mergeSortHelper(arr, mid + 1, right);

      await merge(arr, left, right);

    }
  }
  const mergeSort = async () => {
    setStartSorting(true)
    var arrayRef = [...array]
    await mergeSortHelper(arrayRef, 0, array.length - 1)
    setStartSorting(false)
  }

  // Selection Sort
  const selectionSort = async () => {
    let animationSpeed = arraySize == 25 ? 150 : 250

    setStartSorting(true)
    var tempArr = [...array]
    for (let i = 0; i < tempArr.length - 1; i++) {
      var min = i
      var j
      for (j = i; j < tempArr.length; j++) {
        document.getElementById(j).style.backgroundColor = "green";
        await delay(animationSpeed)
        if (tempArr[j] <= tempArr[min]) {
          document.getElementById(min).style.backgroundColor = "#343434";
          document.getElementById(j).style.backgroundColor = "blue";
          await delay(animationSpeed)
          min = j
        }
        else {
          document.getElementById(j).style.backgroundColor = "#343434";
        }
      }
      let bar1 = document.getElementById(i).style;
      await delay(2 * animationSpeed)
      var temp = tempArr[min]
      tempArr[min] = tempArr[i]
      tempArr[i] = temp
      document.getElementById(min).style.backgroundColor = "#343434"
      setArray([...tempArr])
      bar1.backgroundColor = "orange"
      await delay(2 * animationSpeed)
    }
    setStartSorting(false)
  }

  // Insertion Sort
  const insertionSort = async () => {
    let animationSpeed = arraySize == 25 ? 150 : 250

    setStartSorting(true)
    var tempArr = [...array]
    document.getElementById(0).style.backgroundColor = "orange"
    for (let i = 1; i < tempArr.length; i++) {
      setTemp(tempArr[i])
      let temp = tempArr[i];
      var j
      for (j = i - 1; j >= 0; j--) {
        document.getElementById(j).style.backgroundColor = "green"
        await delay(2 * animationSpeed)
        if (tempArr[j] > temp) {
          tempArr[j + 1] = tempArr[j]
          setArray([...tempArr])
          await delay(2 * animationSpeed)
          document.getElementById(j).style.backgroundColor = "orange"
        }
        else {
          document.getElementById(j).style.backgroundColor = "orange"
          break;
        }
        await delay(animationSpeed)
      }
      tempArr[j + 1] = temp;
      setArray([...tempArr])
      document.getElementById(i).style.backgroundColor = "orange"
      await delay(3 * animationSpeed)
    }
    setStartSorting(false)
  }

  // quick sort
  const quickSortHelper = async (arr, a, b) => {
    if (b > a) {
      let bars = []
      for (let index = a; index <= b; index++) {
        bars.push(document.getElementById(index).style)
        document.getElementById(index).style.backgroundColor = "orange"
      }
      document.getElementById(a).style.backgroundColor = "blue"
      await delay(2 * animationSpeed)
      let pivot = getPivot(arr, a, b)
      setArray([...arr])
      document.getElementById(a).style.backgroundColor = "orange"
      document.getElementById(pivot).style.backgroundColor = "blue"
      await delay(2 * animationSpeed)
      for (let index = a; index <= b; index++) {
        bars.push(document.getElementById(index).style)
        document.getElementById(index).style.backgroundColor = "#343434"
      }
      await delay(2 * animationSpeed)
      await quickSortHelper(arr, a, pivot - 1)
      await quickSortHelper(arr, pivot + 1, b)
    }
  }
  const quickSort = async () => {
    setStartSorting(true)
    let arr = [...array]
    await quickSortHelper(arr, 0, arr.length - 1)
    setStartSorting(false)
  }
  const getPivot = (arr, a, b) => {
    let pivot = arr[a]
    var i = a
    var j = b
    while (j > i) {
      while (pivot >= arr[i] && i <= b) {
        i++
      }
      while (pivot < arr[j] && j >= a) {
        j--
      }
      if (j > i) {
        let temp = arr[i]
        arr[i] = arr[j]
        arr[j] = temp
      }
    }
    let temp = pivot
    arr[a] = arr[j]
    arr[j] = temp
    return j
  }

  const heapSort = async () => {
    let animationSpeed = arraySize == 25 ? 130 : 250
    var arr = [...array];
    setStartSorting(true)
    var length = arr.length;
    var index = Math.floor(length / 2 - 1);
    var lastChild = length - 1;
    while (index >= 0) {
      await heapify(arr, length, index);
      index--;
    }
    while (lastChild >= 0) {
      // Delete Operation
      setText("Deleting the largest element (Pushing the largest element to the end)")
      var swap1 = arr[0];
      var swap2 = arr[lastChild];
      
      arr[0] = swap2;
      arr[lastChild] = swap1;
      setArray([...arr]);
      document.getElementById(lastChild).style.backgroundColor="green"
      await delay(animationSpeed*2)
      await heapify(arr, lastChild, 0);
      lastChild--;
      await delay(animationSpeed)
    }
    setStartSorting(false)
  }

  const heapify = async (arr, length, index) => {
    let animationSpeed = arraySize == 25 ? 130 : 250
    setText(`Heapifying ${arr[index]}`)
    var largest = index;
    //Left Child
    var leftNode = index * 2 + 1;
    //Right Child
    var rightNode = leftNode + 1;
    document.getElementById(index).style.backgroundColor = "yellow"
    if (leftNode < length) {
      document.getElementById(leftNode).style.backgroundColor = "orange"
    }
    if (rightNode < length) {
      document.getElementById(rightNode).style.backgroundColor = "orange"
    }

    //Check if left is largest, check if reached end
    if (leftNode < length && arr[leftNode] > arr[largest]) {
      largest = leftNode;
    }

    //Check if right is largest, check if reached end
    if (rightNode < length && arr[rightNode] > arr[largest]) {
      largest = rightNode;
    }

    //Check if parent is still largest, if not: perform a swap between the smallest and the largest
    if (largest != index) {
      var swap1 = arr[index];
      var swap2 = arr[largest];

      arr[index] = swap2;
      arr[largest] = swap1;
      await delay(animationSpeed*2)
      setArray([...arr])
      await delay(animationSpeed*2)
      document.getElementById(index).style.backgroundColor = "#343434"
      if (leftNode < length) {
        document.getElementById(leftNode).style.backgroundColor = "#343434"
      }
      if (rightNode < length) {
        document.getElementById(rightNode).style.backgroundColor = "#343434"
      }
      setText("")
      await delay(animationSpeed*2)
      await heapify(arr, length, largest);
    } else {
      setText("")
      document.getElementById(index).style.backgroundColor = "#343434"
      if (leftNode < length) {
        document.getElementById(leftNode).style.backgroundColor = "#343434"
      }
      if (rightNode < length) {
        document.getElementById(rightNode).style.backgroundColor = "#343434"
      }
    }
  }


  const camelize = (str) => {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
  }
  const Handler = {
    bubbleSort,
    selectionSort,
    mergeSort,
    insertionSort,
    quickSort,
    heapSort
  }
  const sizeArray = windowWidth > 750 ? [5, 10, 25] : [5, 10]
  return (
    <div>
      <h1>Sorting Visualizer <BiSort /></h1>
      <div className='options'>
        {algo.name === "Insertion Sort" && <div className='temp'>Temp :{temp}</div>}
        {algo.name === "Heap Sort" && <div className='temp'>{text}</div>}
        <div id="algo">
          {theory.map((algorithm) => {
            return (<button key={algorithm.name} onClick={() => { setAlgo(algorithm) }} className={algorithm.name === algo.name ? "selected-btn" : undefined} disabled={startSorting}>{algorithm.name}</button>)
          })}
        </div>
        <div className='size-option'>
          Size :
          <select id="size" disabled={startSorting} value={arraySize} onChange={(e) => { setArraySize(e.target.value) }}>
            {sizeArray.map((size, i) => {
              return (<option key={i} value={size} >{size}</option>)
            })}
          </select>
        </div>
        <button className="randomize-btn" disabled={startSorting} onClick={randomizeArray}>Randomize</button>
      </div>
      <div className='bars'>
        {array.map((size, id) => {
          return (<div key={id} className='bar' id={id} style={{ height: size, color: 'white', textAlign: 'center' }}>{size}</div>)
        })}
      </div>
      <div className='info' >
        <div className='colors'>

          {Object.keys(algo.colours).map((color, key) => {
            return <div key={key} className='color-cont'>
              <div style={{ color: color }} className='color'><RiCheckboxBlankFill /></div>
              <div>{algo.colours[color]}</div>
            </div>
          })}
        </div>
        <div>
          {!startSorting ? <button onClick={() => { Handler[`${camelize(algo.name)}`]() }} disabled={startSorting}><AiFillPlayCircle /></button> :
            <button className='Restart' onClick={() => { window.location.reload() }}>Restart</button>}
        </div>
        <div>Avg Time Complexity: <br />{algo.timeComp} <br /><br /> Space Complexity: <br />{algo.spaceComp}</div>
      </div>
    </div>
  )
}

export default SortingVisalizer
