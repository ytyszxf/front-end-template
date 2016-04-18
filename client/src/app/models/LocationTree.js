
(function(){
    var Node = function(name, id){
        this.id = id;
        this.name = name;
        this.container = [];
        this.children = [];
    };

    Node.prototype.findNodeById = function(id){
        if(this.id == id)return this;
        var foundNode = null;
        _.each(this.children, function(child){
            foundNode = foundNode || child.findNodeById(id);
        });
        return foundNode;
    };

    Node.prototype.retrieve = function(func){
        retrieve(this, func);
    }

    window.LocationTree = LocationTree;

    function LocationTree(locations){
        var that = this;
        that.separator = '-';
        that.locations = [];
        that.tree = new Node('', '');
        _.each(locations, function(location){
            that.merge(location);
        });
        this.isHeader = true;
    };

    LocationTree.prototype.parse = function(locationStr){

        var list = locationStr.split(this.separator),
            location = new Node('', ''),
            parent = location,
            ids = [],
            that = this;


        _.each(list, function(loc){
            ids.push(loc);

            var child = new Node(loc, ids.join(that.separator));
            child.container = parent.children;
            parent.children.push(child);
            parent = child;
        });

        return location;
    };

    LocationTree.prototype.merge = function(location){
        var parsedLocation = this.parse(location);
        merge(this.tree, parsedLocation);
        this.locations.push(location);
    };

    function merge(node1, node2){
        if(!node1 instanceof Node || !node2 instanceof Node || node1.name != node2.name) return;
        _.each(node2.children, function(node2Child){
            var node1Child = _.find(node1.children,function(node1Child){
                return node1Child.name == node2Child.name;
            })
            if(node1Child == undefined){
                node1.children.push(node2Child);
            }else{
                merge(node1Child, node2Child);
            }
        });
    }

    function retrieve(node, func){
        _.each(node.children, function(child){
            retrieve(child, func);
        });
        if(!node.isHeader) func(node);
    }

})();
