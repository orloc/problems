var s1 = [];
var s2 = [];

function rand(low, high){
    return Math.floor(Math.random() * ( high- low + 1) + low);
}

for (i = 0; i < 50; i++){
    s1.push(rand(0, 100));
    s2.push(rand(0, 100));
}

function getSubSequence(input){
    return input.reduce(function(old, val) {
        if (!old.length){
            old.push(val);
            return old;
        }
        
        if (old[old.length - 1] <= val) {
            old.push(val); 
        }
        return old;
    }, []);
}

function powerSet(set){
    var size = Math.pow(set.length, 2); 
    var res = [];
    for(var count = 0; count < size; count++){
        var subSet = [];
        for(var i = 0; i < set.length - 1; i++){
            // if ith bit of count is set print set index
            if (count & 1 << i){
                subSet.push(set[i]);
            }
        }
        res.push(subSet);
    }
    res.push(set);
    return res;
}

function reduceCommonSequences(a, b){
    var ret = [];
    for(var i = 0; i < a.length -1 ;i++){
        for(var j = 0; j < b.length -1; j++){
            if (ret.length && ret[ret.length-1].length >= b[i].length) continue;
            if (arrayEquals(a[i],b[j])){
                ret.push(b[i]);
            }
        }
    }
    
    return ret;
}

function arrayEquals(a,b){
    if(a === b) return true;
    if(a == null || b == null) return false;
    if(a.length != b.length) return false;
    
    for(var i = 0; i < a.length; i++){
        if(a[i] !== b[i]) return false;
    }
    return true;
}

function byLength(a,b){
    return a.length > b.length;
}

console.time('ps/sequence');
var subSequence1 = powerSet(s1).map(function(set) {
    return getSubSequence(set);
});
console.timeEnd('ps/sequence');

console.time('ps/sequence2');
var subSequence2 = powerSet(s2).map(function(set) {
    return getSubSequence(set);
});
console.timeEnd('ps/sequence2');

console.time('sorts');
var sorted = subSequence1.sort(byLength);
var sorted2 = subSequence2.sort(byLength);
console.timeEnd('sorts');

console.time('compare sieve');
var compared = reduceCommonSequences(sorted, sorted2);
console.timeEnd('compare sieve');

var top =compared.sort(byLength);

console.log(top);
console.log(top[top.length-1]);

