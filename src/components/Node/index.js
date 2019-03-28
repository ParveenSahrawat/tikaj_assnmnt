import React, { Component } from 'react';
import Parent from './Parent';

class Node extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nodes : [],
        }
    
        this.addNode = this.addNode.bind(this);
        this.editNode = this.editNode.bind(this);
        this.removeNode = this.removeNode.bind(this);
    }

    addNode() {
        let existingNodes = this.state.nodes;
        let nodeObj = {};
        nodeObj.text = 'Node';
        // nodeObj.childNodes = [];
        nodeObj.number = existingNodes.length + 1;
        nodeObj.marginLeft = '30px';
        nodeObj.edit = false;
        existingNodes.push(nodeObj);
        this.setState({nodes : [...existingNodes]});
    }
    editNode() {

    }
    removeNode(index) {
        let existingNodes = this.state.nodes;
        existingNodes.splice(index, 1);
        this.setState({nodes : [...existingNodes]});
    }

    render() {
        return (
            <div>
                <button onClick={this.addNode} >Add Node</button>
                {
                    this.state.nodes.map((item, index) => {
                        return (
                            <Parent 
                                key={index} 
                                text={item.text} 
                                number={item.number}
                                index={index}
                                enableEdit={item.edit}
                                add={this.addNode}
                                edit={this.editNode}
                                remove={this.removeNode}
                                marginLeft={item.marginLeft}
                            />
                        )
                    })
                }
            </div>
        );
    }
}

export default Node;