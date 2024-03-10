 const theory=[
    {
        name:"Bubble Sort",
        timeComp:"O( n^2 )",
        spaceComp:"O( 1 )",
        colours:{
            "green":"Elements Being Compared and swapped if required",
            "blue":"Sorted Part Of Array"
        }
    },
    {
        name:"Selection Sort",
        timeComp:"O( n^2 )",
        spaceComp:"O( 1 )",
        colours:{
            "green":"Checking the element if it is smallest",
            "blue":"Smallest Element Found Till Now",
            "orange":"Sorted part of array"
        }
        
    },
    {
        name:"Insertion Sort",
        timeComp:"O( n^2 )",
        spaceComp:"O( 1 )",
        colours:{
            "green":"Comparing the element with element stored in temp variable and shifting it rightwards if it less than temp",
            "orange":"Sorted part of array"
        }
        
    },
    {
        name:"Quick Sort",
        timeComp:"O( nlog ( n ) )",
        spaceComp:"O( log ( n ) )",
        colours:{
            orange:"Subarray in which pivot is being placed at correct position",
            blue:"Pivot Element (Element that is being put at its correct position)"
        }
    },
    {
        name:"Merge Sort",
        timeComp:"O( nlog ( n ) )",
        spaceComp:"O( n )",
        colours:{
            orange:"subarray being merged"
        }
    },
    {
        name:"Heap Sort",
        timeComp:"O( nlog ( n ) )",
        spaceComp:"O( 1 )",
        colours:{
            yellow:"Parent node (node being heapified)",
            orange:"Child node",
            green:"Sorted Part"
        }
    }
]
export default theory