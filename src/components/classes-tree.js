import TreeView from "@material-ui/lab/TreeView";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import React from "react";
import TreeItem from "@material-ui/lab/TreeItem";


const ClassesTree = ({handleNodeSelection, nodesGraph}) => {

    function renderTree(nodes) {
        return <TreeItem key={nodes.data.uri} nodeId={nodes.data.uri} label={nodes.data.className}
                         onClick={(e) => handleNodeSelection(nodes.data.className, nodes.data.uri, e)} >
            {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
        </TreeItem>
    }

    return (
        <div>
            <h4>Clases</h4>
            <TreeView defaultCollapseIcon={<ArrowDropDownIcon/>}
                      defaultExpandIcon={<ArrowRightIcon/>}>
                {renderTree(nodesGraph)}
            </TreeView>
        </div>
    )
}

export default ClassesTree;