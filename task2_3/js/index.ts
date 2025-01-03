// Helper function to measure the performance of sorting algorithms
function measurePerformance(sortingFunction: (arr: number[]) => number[], arr: number[]) {
    const startTime = performance.now();
    sortingFunction([...arr]);
    const endTime = performance.now();
    return endTime - startTime;
}

// Bubble Sort
function bubbleSort(arr: number[]): number[] {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}

// Sort by Choice (Selection Sort)
function selectionSort(arr: number[]): number[] {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
    return arr;
}

// Insertion Sort
function insertionSort(arr: number[]): number[] {
    const n = arr.length;
    for (let i = 1; i < n; i++) {
        const key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
    return arr;
}

// Quicksort
function quickSort(arr: number[]): number[] {
    if (arr.length <= 1) {
        return arr;
    }
    const pivot = arr[arr.length - 1];
    const left = arr.filter((el, idx) => el <= pivot && idx !== arr.length - 1);
    const right = arr.filter(el => el > pivot);
    return [...quickSort(left), pivot, ...quickSort(right)];
}

// Merge Sort
function mergeSort(arr: number[]): number[] {
    if (arr.length <= 1) {
        return arr;
    }
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));

    return merge(left, right);
}

function merge(left: number[], right: number[]): number[] {
    const result: number[] = [];
    let i = 0, j = 0;

    while (i < left.length && j < right.length) {
        if (left[i] < right[j]) {
            result.push(left[i]);
            i++;
        } else {
            result.push(right[j]);
            j++;
        }
    }

    return result.concat(left.slice(i)).concat(right.slice(j));
}

// Example usage
const array = Array.from({ length: 1000 }, () => Math.floor(Math.random() * 1000));

const algorithms = {
    "Bubble Sort": bubbleSort,
    "Selection Sort": selectionSort,
    "Insertion Sort": insertionSort,
    "Quicksort": quickSort,
    "Merge Sort": mergeSort,
};

console.log("Original Array:", array);

for (const [name, func] of Object.entries(algorithms)) {
    const sortedArray = func([...array]);
    const timeTaken = measurePerformance(func, array);
    console.log(`${name}:`, sortedArray, `Time: ${timeTaken.toFixed(4)} ms`);
}
