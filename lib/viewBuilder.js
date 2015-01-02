/**
 * Creates fresh heirarchy from files
 */
function viewBuilder(specs) {
   var specArray = [];
   var heirarchy = {};
   var graph = {
        nodes: [],
        links: []
   };
   var parent;

   function getHeirarchyParent(phrase) {
        var match;
        for (var key in heirarchy) {
            if (phrase.indexOf(key) !== -1) {
                match = { name: key, index: heirarchy[key] };
            }
        };
        return match;
   }


   for(var key in specs) {
        specArray.push(key);
   }
   specArray.sort();
   //var heirarchyPointer = heirarchy;
   for (var i = 0; i < specArray.length; i++) {
        parent = getHeirarchyParent(specArray[i]);
        if (parent) {
            graph.links.push({source: parent.index, target: i });
            //heirarchyPointer = heirarchyPointer[specArray[i -1]];
        } else {
            //heirarchyPointer = heirarchy;
            heirarchy = {};

        }
        heirarchy[specArray[i]] = i;
        var replace = parent? parent.name : '';
        var key = specArray[i].replace(replace, "").trim();
        graph.nodes.push({
            name: key,
            shoulds: specs[specArray[i]]
        });
        // heirarchyPointer[key] = {
        //     '_shoulds': specs[specArray[i]]
        // };
   };
   return graph;
}

module.exports = { build: viewBuilder };