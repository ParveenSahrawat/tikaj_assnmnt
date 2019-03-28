import React, { Component } from 'react';
import Child from './Child';

class Node extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nodes : [],
        }
    
        this.addNode = this.addNode.bind(this);
        this.editNode = this.editNode.bind(this);
        this.removeNode = this.removeNode.bind(this);
        this.changeText = this.changeText.bind(this);
        this.closeInput = this.closeInput.bind(this);
        this.collapseNode = this.collapseNode.bind(this);
    }

    addNode() {
        let existingNodes = this.state.nodes;
        let nodeObj = {};
        nodeObj.text = 'Node';
        // nodeObj.childNodes = [];
        nodeObj.number = existingNodes.length + 1;
        nodeObj.marginLeft = '30px';
        nodeObj.edit = false;
        nodeObj.open = true;
        existingNodes.push(nodeObj);
        this.setState({nodes : [...existingNodes]});
    }
    editNode(index) {
        let existingNodes = this.state.nodes;
        existingNodes[index].edit = true;
        this.setState({nodes : [...existingNodes]});
    }
    changeText(index, event) {
        debugger
        event.preventDefault();
        let existingNodes = this.state.nodes;
        existingNodes[index].text = event.target.value;
        this.setState({nodes : existingNodes});
    }
    closeInput(index, event) {
        debugger
        if(event.which === 13) {
            debugger
            let existingNodes = this.state.nodes;
            existingNodes[index].edit = false;
            this.setState({nodes : [...existingNodes]});
        }
    }
    removeNode(index) {
        let existingNodes = this.state.nodes;
        existingNodes.splice(index, 1);
        this.setState({nodes : [...existingNodes]});
    }
    collapseNode(index) {
        let existingNodes = this.state.nodes;
        existingNodes[index].open = !existingNodes[index].open;
        this.setState({nodes : [...existingNodes]});
    }

    render() {
        return (
            <div>
                <button onClick={this.addNode} >Add Node</button>
                {
                    this.state.nodes.map((item, index) => {
                        return (
                            <Child 
                                key={index} 
                                text={item.text} 
                                number={item.number}
                                index={index}
                                enableEdit={item.edit}
                                add={this.addNode}
                                edit={this.editNode}
                                remove={this.removeNode}
                                marginLeft={item.marginLeft}
                                changeText={this.changeText}
                                closeInput={this.closeInput}
                                collapseNode={this.collapseNode}
                                open={item.open}
                            />
                        )
                    })
                }
            </div>
        );
    }
}

export default Node;