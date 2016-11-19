
// n things 
//
// every k thing - what is the answer

var set  = [ 3, 4, 5, 6, 7, 8, 9];

// k = 3
// [ 3, 4, --5, 6, 7, 8, 9]
// [ 3, 4, 6, 7, --8, 9]
// [ 3, --4, 6, 7,  9]
// [ 3, 6, 7, --9]
// [ 3, 6, --7]
// [ --3, 6 ]
// [ --6 ]
// 6, 

var cycle = 1;
function getKth(list, kth) {
    if (list.length < kth){
        var maxCounts = list.length;
        var newList = list;
        while(newList.length < kth){
            newList = newList.concat(list);
        }

        while(){
            var item = newList.splice(kth-1, 1);
            maxCounts++;
        }
    } else {
        var item = list.splice(kth-1, 1);
        var listA = list.slice(0, kth-1);
        var listB = list.slice(kth-1, list.length);
        var newList = listB.concat(listA);

        if (!list.length){
            return item;
        }

        return getKth(newList, kth);
    }
}

getKth(set, 3);

